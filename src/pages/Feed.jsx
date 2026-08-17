/**
 * Feed — ITLA Crush
 *
 * Vista del feed público de confesiones.
 */
import { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../config/firebase'
import './Feed.css'
import '../pages/NewConfession.css' // Importar los estilos visuales de las cartas

export function Feed() {
  const [confessions, setConfessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Escuchar las confesiones públicas en tiempo real
    const q = query(
      collection(db, 'declarations'),
      where('isPublic', '==', true)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      // Ordenar localmente por fecha de creación (de más reciente a más antigua)
      // para evitar el error de requerir un índice compuesto de Firestore por defecto.
      data.sort((a, b) => {
        const timeA = a.createdAt?.toMillis() || 0
        const timeB = b.createdAt?.toMillis() || 0
        return timeB - timeA
      })

      setConfessions(data)
      setLoading(false)
    }, (error) => {
      console.error("Error fetching confessions:", error)
      setLoading(false)
    })

    // Limpiar listener al desmontar el componente
    return () => unsubscribe()
  }, [])

  return (
    <div className="feed">
      <section className="feed-hero">
        <div className="container">
          <span className="badge badge-accent">💌 Feed Público</span>
          <h1 className="feed-hero-title">Feed de Confesiones</h1>
          <p className="feed-hero-subtitle">
            Un espacio donde los crushes dejan de ser secretos.
          </p>
        </div>
      </section>

      <section className="feed-content">
        <div className="container">
          {loading ? (
            <div className="feed-empty-state">
              <p className="feed-empty-text">Cargando confesiones...</p>
            </div>
          ) : confessions.length === 0 ? (
            <div className="feed-empty-state">
              <span className="feed-empty-icon" aria-hidden="true">👀</span>
              <p className="feed-empty-text">
                Todavía nadie se ha atrevido a confesar su crush.
              </p>
              <p className="feed-empty-sub">
                Las declaraciones aparecerán aquí próximamente.
              </p>
            </div>
          ) : (
            <div className="feed-grid">
              {confessions.map((confession) => (
                <div 
                  key={confession.id} 
                  className={`nc-preview nc-preview--${confession.backgroundStyle || 'notebook'} feed-card`}
                >
                  <div className="nc-preview-to">
                    Para: <strong>{confession.recipientName || 'alguien especial'}</strong>
                  </div>
                  <div className="nc-preview-message" style={{ whiteSpace: 'pre-wrap' }}>
                    {confession.body}
                  </div>
                  <div className="nc-preview-from">
                    — {confession.isAnonymous ? 'Anónimo/a ✨' : 'Tu admirador/a secret@'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
