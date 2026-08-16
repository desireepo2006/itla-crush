/**
 * Feed — ITLA Crush
 *
 * Vista del feed público de confesiones.
 * Fase 6 del proyecto: se conectará a Firebase una vez que la autenticación esté lista.
 */
import './Feed.css'

export function Feed() {
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
          <div className="feed-empty-state">
            <span className="feed-empty-icon" aria-hidden="true">👀</span>
            <p className="feed-empty-text">
              Todavía nadie se ha atrevido a confesar su crush.
            </p>
            <p className="feed-empty-sub">
              Las declaraciones aparecerán aquí próximamente.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
