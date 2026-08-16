/**
 * firebase.js — ITLA Crush
 *
 * Inicialización central de Firebase.
 * Exporta las instancias de Auth y Firestore para uso en toda la aplicación.
 *
 * Las credenciales se leen desde variables de entorno (VITE_FIREBASE_*)
 * definidas en .env.local — nunca se escriben directamente en el código.
 */
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

/** Aplicación Firebase inicializada */
const app = initializeApp(firebaseConfig)

/** Servicio de Autenticación — Firebase Auth */
export const auth = getAuth(app)

/** Servicio de Base de Datos — Cloud Firestore */
export const db = getFirestore(app)
