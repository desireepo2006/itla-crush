export function Layout({ children }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-container">
            <span className="logo-icon">❤️</span>
            <span className="logo-text">
              ITLA <span className="text-accent">Crush</span>
            </span>
          </div>
          <nav className="header-nav">
            <span className="badge badge-development">MVP Setup</span>
          </nav>
        </div>
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-status">
            <span className="status-indicator"></span>
            Fase de Desarrollo Inicial &bull; Git Flow Setup
          </p>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} ITLA Crush. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Styled JSX for Premium look and feel without complex libraries */}
      <style>{`
        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: relative;
        }

        /* Glassmorphism Header */
        .app-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-color);
          transition: var(--transition);
        }

        @media (prefers-color-scheme: dark) {
          .app-header {
            background: rgba(8, 13, 26, 0.7);
          }
        }

        .header-content {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .logo-icon {
          animation: pulse 2s infinite ease-in-out;
        }

        .text-accent {
          color: var(--itla-red);
        }

        .badge {
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .badge-development {
          background-color: var(--accent-light);
          color: var(--itla-blue);
          border: 1px solid rgba(0, 75, 147, 0.2);
        }

        @media (prefers-color-scheme: dark) {
          .badge-development {
            background-color: rgba(59, 130, 246, 0.2);
            color: #60a5fa;
            border-color: rgba(59, 130, 246, 0.3);
          }
        }

        /* Main Section layout */
        .app-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        /* Footer styling */
        .app-footer {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding: 2rem 1.5rem;
          text-align: center;
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .footer-content {
          max-width: var(--max-width);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
        }

        .footer-status {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0;
          font-weight: 500;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #10b981; /* active/ready green */
          display: inline-block;
          box-shadow: 0 0 8px #10b981;
          animation: statusPulse 1.5s infinite alternate;
        }

        .footer-copy {
          margin: 0;
          opacity: 0.8;
        }

        /* Animations */
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        @keyframes statusPulse {
          from { opacity: 0.4; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
