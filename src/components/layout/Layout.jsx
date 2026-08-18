/**
 * Layout — ITLA Crush
 *
 * Base layout wrapper with header and footer.
 * Flat design, thin black borders, ITLA branding.
 */
import { Link } from 'react-router-dom'
import { User, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { LoveAlarm } from '../LoveAlarm'
import './Layout.css'

export function Layout({ children }) {
  const { user, userData, logout } = useAuth()
  return (
    <div className="layout">
      <header className="layout-header">
        <div className="container layout-header-inner">
          <Link to="/" className="layout-logo" aria-label="ITLA Crush — Inicio">
            <img
              src="/assets/logo-heart.png"
              alt=""
              aria-hidden="true"
              className="layout-logo-img"
              width="32"
              height="32"
            />
            <span className="layout-logo-text">
              <span className="layout-logo-itla">ITLA</span>
              <span className="layout-logo-crush">CRUSH</span>
            </span>
          </Link>
          <nav className="layout-nav">
            <Link to="/feed" className="layout-nav-link">Feed</Link>

            {user ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <LoveAlarm />
                  <Link to="/perfil" className="layout-nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: '600', color: 'var(--color-primary)' }}>
                    <User size={16} aria-hidden="true" />
                    Hola, {userData?.firstName || 'Usuario'}
                  </Link>
                </div>
                <button
                  onClick={logout}
                  className="layout-nav-link"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}
                  aria-label="Cerrar sesión"
                >
                  <LogOut size={16} aria-hidden="true" />
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
          </nav>
        </div>
      </header>

      <main className="layout-main">
        {children}
      </main>

      <footer className="layout-footer">
        <div className="container layout-footer-inner">
          <p>&copy; {new Date().getFullYear()} ITLA Crush. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
