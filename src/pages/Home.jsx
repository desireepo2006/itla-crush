/**
 * Home — ITLA Crush
 *
 * Página principal con video de fondo y Feed de confesiones.
 */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/Button'
import './Home.css'
import '../pages/NewConfession.css' // Importamos los estilos visuales de las cartas

// Ícono SVG de candado minimalista para el Gated Content
const LockIcon = () => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ marginBottom: '8px' }}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

export function Home() {
  const { user } = useAuth()
  const [confessions, setConfessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Escuchar todas las confesiones ordenadas por fecha descendente
    const q = query(
      collection(db, 'declarations'),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setConfessions(data)
      setLoading(false)
    }, (error) => {
      console.error("Error fetching confessions:", error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="home">
      {/* ── Hero ── */}
      <section className="home-hero">
        {/* Fondo de video — nítido, sin blur */}
        <video
          className="home-hero-video"
          src="/assets/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Overlay sutil para dar contraste al texto sin desenfoque */}
        <div className="home-hero-overlay" aria-hidden="true" />

        {/* Contenido sobre el video */}
        <div className="home-hero-content container">
          <h1 className="home-hero-title">
            Donde los crushes{' '}
            <span className="home-hero-highlight">dejan de ser secretos.</span>
          </h1>
          <p className="home-hero-subtitle">
            Una red social de confesiones románticas para estudiantes del ITLA.
          </p>
          <div className="home-hero-actions">
            <Link to="/nueva">
              <Button variant="primary" size="lg">Confesarte ❤️</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Feed Principal ── */}
      <section className="feed-content" style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <div className="home-section-header" style={{ marginBottom: 'var(--space-2xl)', textAlign: 'center' }}>
            <span className="badge badge-accent">💌 En vivo</span>
            <h2>Últimas Confesiones</h2>
          </div>

          {loading ? (
            <div className="feed-empty-state" style={{ textAlign: 'center', padding: '3rem' }}>
              <p className="feed-empty-text">Cargando confesiones...</p>
            </div>
          ) : confessions.length === 0 ? (
            <div className="feed-empty-state" style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
              gap: '1rem', padding: '4rem 2rem', border: '1px dashed var(--color-border-soft)', 
              borderRadius: 'var(--radius-lg)', textAlign: 'center', backgroundColor: 'var(--color-surface)' 
            }}>
              <span aria-hidden="true" style={{ fontSize: '3rem' }}>👀</span>
              <p className="feed-empty-text" style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
                Todavía nadie se ha atrevido a confesar su crush
              </p>
              <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                ¡Sé el primero en romper el hielo!
              </p>
            </div>
          ) : (
            <div className="feed-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: 'var(--space-xl)' 
            }}>
              {confessions.map((conf) => {
                const isPrivate = conf.isPublic === false
                const isLocked = !user && isPrivate
                
                // Texto falso para ofuscar el DOM si está bloqueado
                const displayBody = isLocked 
                  ? "Este contenido es privado. Para mantener el secreto a salvo, hemos ocultado este mensaje de los visitantes no registrados. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  : conf.body

                const authorDisplay = conf.isAnonymous ? 'Anónimo' : (conf.authorName || 'Usuario')
                const recipientDisplay = conf.recipientName || 'alguien'

                // Estilos para el texto desenfocado
                const blurredStyle = isLocked ? {
                  filter: 'blur(6px)',
                  userSelect: 'none',
                  pointerEvents: 'none'
                } : {}

                return (
                  <div 
                    key={conf.id} 
                    className={`nc-preview nc-preview--${conf.backgroundStyle || 'notebook'} feed-card`}
                    style={{ position: 'relative', overflow: 'hidden', height: '100%' }}
                  >
                    <div className="nc-preview-to" style={blurredStyle}>
                      Para: <strong>{isLocked ? '**********' : recipientDisplay}</strong>
                    </div>
                    
                    <div className="nc-preview-message" style={{ 
                      whiteSpace: 'pre-wrap', 
                      fontFamily: conf.font === 'default' ? 'inherit' : conf.font,
                      ...blurredStyle
                    }}>
                      {displayBody}
                    </div>
                    
                    <div className="nc-preview-from" style={blurredStyle}>
                      — {isLocked ? '**********' : authorDisplay}
                    </div>

                    {isLocked && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                      }}>
                        <div style={{ 
                          backgroundColor: 'var(--color-surface)', 
                          padding: '1.5rem', 
                          borderRadius: 'var(--radius-lg)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                        }}>
                          <LockIcon />
                          <Link to="/login" style={{ 
                            textDecoration: 'none', 
                            fontWeight: '600', 
                            color: 'var(--color-text)',
                            border: '1px solid var(--color-border)',
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            marginTop: '0.5rem',
                            fontSize: '0.9rem'
                          }}>
                            Inicia sesión para ver
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
