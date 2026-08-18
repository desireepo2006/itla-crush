/* eslint-disable react-refresh/only-export-components */
/**
 * AuthContext — ITLA Crush
 *
 * Contexto global para manejar el estado de autenticación de Firebase
 * y los datos adicionales del usuario almacenados en Firestore.
 */
import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (userDoc.exists()) {
            setUserData(userDoc.data())
          } else {
            setUserData(null)
          }
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error)
          setUserData(null)
        }
      } else {
        setUser(null)
        setUserData(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  async function logout() {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  const value = {
    user,
    userData,
    loading,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <p>Cargando...</p>
        </div>
      )}
    </AuthContext.Provider>
  )
}
