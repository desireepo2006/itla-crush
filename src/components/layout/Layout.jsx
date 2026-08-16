/**
 * Layout — ITLA Crush
 *
 * Base layout wrapper with header and footer.
 * Flat design, thin black borders, ITLA branding.
 */
import './Layout.css'

export function Layout({ children }) {
  return (
    <div className="layout">
      <header className="layout-header">
        <div className="container layout-header-inner">
          <a href="/" className="layout-logo" aria-label="ITLA Crush — Inicio">
            <span className="layout-logo-heart" aria-hidden="true">❤️</span>
            <span className="layout-logo-text">
              ITLA <span className="layout-logo-crush">Crush</span>
            </span>
          </a>
          <span className="badge badge-primary">MVP Setup</span>
        </div>
      </header>

      <main className="layout-main">
        {children}
      </main>

      <footer className="layout-footer">
        <div className="container layout-footer-inner">
          <p className="layout-status">
            <span className="status-indicator"></span>
            Fase de Desarrollo Inicial &bull; Git Flow Setup
          </p>
          <p>&copy; {new Date().getFullYear()} ITLA Crush. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
