/**
 * Layout — ITLA Crush
 *
 * Base layout wrapper with header and footer.
 * Flat design, thin black borders, ITLA branding.
 */
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Layout.css'

export function Layout({ children }) {
  const { user, userData, logout } = useAuth()
  return (
    <div className="layout">
      <header className="layout-header">
        <div className="container layout-header-inner">
          <Link to="/" className="layout-logo" aria-label="ITLA Crush — Inicio">
            <span className="layout-logo-heart" aria-hidden="true">❤️</span>
            <span className="layout-logo-text">
              ITLA <span className="layout-logo-crush">Crush</span>
            </span>
          </Link>
          <nav className="layout-nav">
            <Link to="/feed" className="layout-nav-link">Feed 💌</Link>
            
            {user ? (
              <>
                <span className="layout-nav-link" style={{ fontWeight: '600', color: 'var(--color-primary)' }}>
                  Hola, {userData?.firstName || 'Usuario'}
                </span>
                <button 
                  onClick={logout} 
                  className="layout-nav-link" 
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="layout-nav-link">Iniciar Sesión</Link>
                <Link to="/registro" className="layout-nav-link">Registrarse</Link>
              </>
            )}

            <Link to="/nueva" className="layout-nav-cta">
              + Confesión
            </Link>
            <span className="badge badge-primary">MVP Setup</span>
          </nav>
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
