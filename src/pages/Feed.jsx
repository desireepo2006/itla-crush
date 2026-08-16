/**
 * Feed — ITLA Crush
 *
 * Vista del feed público de confesiones.
 * Fase 6 del proyecto: se conectará a Firebase una vez que la autenticación esté lista.
 * Por ahora renderiza mock data estático para validar el diseño del componente.
 */
import { ConfessionCard } from '../components/features/ConfessionCard'
import './Feed.css'

/** Mock data — reemplazar por llamadas a Firebase en Fase 4 */
const MOCK_CONFESSIONS = [
  {
    id: 'mock-1',
    to: 'La chica del laboratorio de redes',
    message:
      'Desde que te vi en el laboratorio no dejo de pensar en ti. Siempre llegas temprano y te sientas en la tercera fila. Ojalá algún día me atreviera a hablarte.',
    from: null,
    date: '15 ago 2026',
  },
  {
    id: 'mock-2',
    to: 'Miguel A.',
    message:
      'Cada vez que explicas algo en clase haces que todo parezca más fácil. Llevas tres semestres ayudándome sin saber que me tienes con mariposas desde el primer día. ❤️',
    from: 'Una compañera de Programación Web',
    date: '14 ago 2026',
  },
  {
    id: 'mock-3',
    to: 'El chico de la cafetería',
    message:
      'No sé tu nombre, pero siempre pides el mismo sándwich que yo. Si algún día lees esto... hola. Soy la de la mochila morada.',
    from: null,
    date: '13 ago 2026',
  },
]

export function Feed() {
  return (
    <div className="feed">
      {/* ── Hero ── */}
      <section className="feed-hero">
        <div className="container">
          <span className="badge badge-accent">💌 Feed Público</span>
          <h1 className="feed-hero-title">Feed de Confesiones</h1>
          <p className="feed-hero-subtitle">
            Un espacio donde los crushes dejan de ser secretos.
          </p>
        </div>
      </section>

      {/* ── Confesiones ── */}
      <section className="feed-content">
        <div className="container">
          <div className="feed-grid">
            {MOCK_CONFESSIONS.map((confession) => (
              <ConfessionCard
                key={confession.id}
                to={confession.to}
                message={confession.message}
                from={confession.from}
                date={confession.date}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
