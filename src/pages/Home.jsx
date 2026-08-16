/**
 * Home — Design System Demo
 *
 * Showcases the visual direction of ITLA Crush and details the project status and roadmap.
 */
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import './Home.css'

export function Home() {
  return (
    <div className="home">
      {/* ── Hero ── */}
      <section className="home-hero">
        <div className="container">
          <span className="home-hero-icon" aria-hidden="true">💌</span>
          <h1 className="home-hero-title">
            Donde los crushes{' '}
            <span className="home-hero-highlight">dejan de ser secretos.</span>
          </h1>
          <p className="home-hero-subtitle">
            Una red social de confesiones románticas para estudiantes del ITLA.
          </p>
          <div className="home-hero-actions">
            <Button variant="primary" size="lg">Comenzar</Button>
            <Button variant="outline" size="lg">Explorar</Button>
          </div>
        </div>
      </section>

      {/* ── Bento Demo ── */}
      <section className="home-bento-section">
        <div className="container">
          <div className="home-section-header">
            <span className="badge badge-accent">✨ Design System</span>
            <h2>Vista previa del sistema visual</h2>
          </div>

          <div className="bento-grid">
            {/* Card: Default */}
            <Card>
              <h3>Declaraciones</h3>
              <p>
                Escribe lo que sientes. Elige si quieres que sea público o privado,
                anónimo o con tu nombre.
              </p>
              <Button variant="primary" size="sm">Escribir ❤️</Button>
            </Card>

            {/* Card: Paper — spans 2 cols on tablet+ */}
            <Card variant="paper" className="bento-span-2">
              <h3>📋 Estilo Cuaderno</h3>
              <p>
                Las declaraciones pueden verse como páginas de cuaderno, post-its,
                cartas o notas. Cada estilo tiene su propia personalidad.
              </p>
              <div className="home-paper-preview notebook-lines">
                <p className="home-paper-text">
                  &ldquo;Desde que te vi en el laboratorio no dejo de pensar en ti...&rdquo;
                </p>
              </div>
            </Card>

            {/* Card: Note — notebook lines */}
            <Card variant="note">
              <div className="home-note-content notebook-holes">
                <small className="home-note-label">Nota de cuaderno</small>
                <p className="home-note-text font-arial">
                  [Arial] Las notas de cuaderno incluyen líneas azules y agujeros
                  laterales como un cuaderno real. Esta es una declaración larga
                  para comprobar que el texto se mantiene perfectamente alineado
                  con las líneas sin importar cuántas líneas ocupe el párrafo.
                </p>
                <p className="home-note-text font-comic">
                  [Comic Sans] Incluso con una fuente diferente, la variable de offset
                  ajusta la línea base para que el texto siga apoyado en la guía.
                </p>
                <p className="home-note-text font-times">
                  [Times New Roman] Todo se mantiene en su lugar gracias a la
                  única fuente de verdad: la variable CSS de line-height.
                </p>
              </div>
            </Card>

            {/* Card: Love Alarm */}
            <Card>
              <div className="home-alarm-header">
                <span className="home-alarm-icon" aria-hidden="true">❤️</span>
                <h3>Love Alarm</h3>
              </div>
              <p>
                Tu enamorado/a anónimo/a está más cerca de lo que crees...
              </p>
              <span className="badge badge-accent">Próximamente</span>
            </Card>

            {/* Card: Status & Roadmap (Merged from develop) */}
            <Card variant="paper">
              <span className="badge badge-primary">Fase 2: Configuración</span>
              <h3 className="home-roadmap-title">Estado del Proyecto</h3>
              <p className="home-roadmap-description">
                El entorno frontend del proyecto está preparado. La arquitectura base,
                estilos globales y la integración inicial con ESLint se han configurado correctamente.
              </p>
              <h4 className="home-roadmap-subtitle">Próximos Pasos:</h4>
              <ul className="home-roadmap-list">
                <li>Configuración de Firebase & Auth</li>
                <li>Sistema de Declaraciones de Amor</li>
                <li>Personalización Visual de Publicaciones</li>
                <li>Detección de Proximidad (ITLA Love Alarm)</li>
              </ul>
            </Card>

            {/* Card: Stats preview */}
            <Card variant="paper">
              <h3>Tu perfil</h3>
              <div className="home-stats">
                <div className="home-stat">
                  <span className="home-stat-number">0</span>
                  <span className="home-stat-label">Declaraciones</span>
                </div>
                <div className="home-stat">
                  <span className="home-stat-number">0</span>
                  <span className="home-stat-label">Recibidas</span>
                </div>
                <div className="home-stat">
                  <span className="home-stat-number">—</span>
                  <span className="home-stat-label">Love Alarm</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Buttons Demo ── */}
      <section className="home-buttons-section">
        <div className="container">
          <div className="home-section-header">
            <h2>Botones</h2>
          </div>
          <div className="home-buttons-demo">
            <Button variant="primary" size="sm">Primary SM</Button>
            <Button variant="primary">Primary MD</Button>
            <Button variant="primary" size="lg">Primary LG</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="accent">Accent ❤️</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
