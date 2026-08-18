/**
 * auth.js — ITLA Crush · Servicio de Autenticación
 *
 * Abstrae la lógica de Firebase Auth + Firestore para mantener
 * los componentes React enfocados solo en la UI.
 *
 * Exporta funciones puras que devuelven { success, error }.
 */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

/**
 * Traduce los códigos de error de Firebase a mensajes en español.
 * @param {string} code — Código de error de Firebase (e.g. "auth/email-already-in-use")
 * @returns {string} Mensaje amigable en español.
 */
function translateFirebaseError(code) {
  const messages = {
    'auth/email-already-in-use':
      'Este correo electrónico ya está registrado. Intenta iniciar sesión.',
    'auth/invalid-email':
      'El formato del correo electrónico no es válido.',
    'auth/weak-password':
      'La contraseña es muy débil. Debe tener al menos 6 caracteres.',
    'auth/network-request-failed':
      'Error de conexión. Revisa tu internet e inténtalo de nuevo.',
    'auth/too-many-requests':
      'Demasiados intentos fallidos. Espera un momento antes de volver a intentarlo.',
    'auth/operation-not-allowed':
      'El registro por correo no está habilitado. Contacta al administrador.',
    'auth/invalid-credential':
      'Credenciales incorrectas. Verifica tu correo y contraseña.',
    'auth/user-not-found':
      'Usuario no encontrado. Revisa el correo ingresado.',
    'auth/wrong-password':
      'La contraseña es incorrecta.',
  }
  return messages[code] ?? 'Ocurrió un error inesperado. Inténtalo de nuevo.'
}

/**
 * Registra un nuevo usuario en Firebase Auth y crea su perfil en Firestore.
 *
 * @param {{ firstName: string, lastName: string, username: string, email: string, password: string }} data
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function registerUser({ firstName, lastName, username, email, password }) {
  try {
    // 1. Crear usuario en Firebase Auth
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    const { uid } = credential.user

    // 2. Guardar perfil en Firestore — uid como ID del documento
    await setDoc(doc(db, 'users', uid), {
      username,
      firstName,
      lastName,
      email,
      createdAt: serverTimestamp(),
      locationEnabled: false,
      notificationEnabled: false,
    })

    return { success: true }
  } catch (err) {
    return { success: false, error: translateFirebaseError(err.code) }
  }
}

/**
 * Inicia sesión de un usuario existente con correo y contraseña.
 *
 * @param {{ email: string, password: string }} data
 * @returns {Promise<{ success: boolean, user?: object, error?: string }>}
 */
export async function loginUser({ email, password }) {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: credential.user }
  } catch (err) {
    return { success: false, error: translateFirebaseError(err.code) }
  }
}
