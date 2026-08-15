export function Home() {
  return (
    <div className="home-container">
      {/* Decorative background glow */}
      <div className="glow-effect"></div>

      <section className="hero-section">
        <div className="hero-card">
          <div className="icon-badge">💌</div>
          <h1 className="hero-title">ITLA Crush</h1>
          <p className="hero-tagline">
            "Quizás tu crush no sabe quién eres... pero ITLA Crush sabe que está cerca. ❤️"
          </p>
          <div className="divider"></div>
          <div className="status-container">
            <span className="status-tag">Fase 2: Configuración</span>
            <p className="status-description">
              El entorno frontend del proyecto está preparado. La arquitectura base,
              estilos globales y la integración inicial con ESLint se han configurado correctamente.
            </p>
          </div>
          <div className="info-box">
            <h2 className="info-box-title">Próximos Pasos en el Roadmap:</h2>
            <ul className="roadmap-list">
              <li>Configuración de Firebase & Auth</li>
              <li>Sistema de Declaraciones de Amor</li>
              <li>Personalización Visual de Publicaciones</li>
              <li>Detección de Proximidad (ITLA Love Alarm)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Styled JSX for scoped premium aesthetics */}
      <style>{`
        .home-container {
          position: relative;
          padding: 3rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          z-index: 1;
        }

        /* Decorative radial glow in the background */
        .glow-effect {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translate(-50%, -20%);
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 75, 147, 0.08) 0%, rgba(217, 35, 52, 0.04) 50%, rgba(0,0,0,0) 70%);
          border-radius: 50%;
          z-index: -1;
          filter: blur(40px);
          pointer-events: none;
        }

        @media (prefers-color-scheme: dark) {
          .glow-effect {
            background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(239, 68, 68, 0.08) 50%, rgba(0,0,0,0) 70%);
          }
        }

        /* Premium Card */
        .hero-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 3rem 2rem;
          max-width: 600px;
          width: 100%;
          text-align: center;
          box-shadow: var(--shadow-lg);
          transition: var(--transition);
        }

        .hero-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
        }

        .icon-badge {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: inline-block;
          animation: float 4s ease-in-out infinite;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          letter-spacing: -0.04em;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, var(--itla-blue), var(--itla-red));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-tagline {
          font-family: var(--font-display);
          font-size: 1.15rem;
          color: var(--text-muted);
          font-weight: 400;
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        .divider {
          height: 1px;
          background: linear-gradient(to right, rgba(0,0,0,0), var(--border-color), rgba(0,0,0,0));
          margin: 2rem 0;
        }

        .status-container {
          margin-bottom: 2rem;
        }

        .status-tag {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          border: 1px solid rgba(16, 185, 129, 0.2);
          margin-bottom: 0.75rem;
        }

        .status-description {
          font-size: 0.95rem;
          color: var(--text-primary);
          line-height: 1.6;
        }

        /* Roadmap Box */
        .info-box {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          text-align: left;
        }

        .info-box-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .roadmap-list {
          margin: 0;
          padding-left: 1.25rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .roadmap-list li {
          position: relative;
        }

        /* Floating Animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}
