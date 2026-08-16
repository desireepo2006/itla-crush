/**
 * ConfessionCard — ITLA Crush
 *
 * Tarjeta que representa una confesión romántica del campus.
 * Usa la variante "paper" del sistema de diseño para el aspecto de nota física.
 *
 * Props:
 *  - to      {string}          Para quién va dirigida la confesión (requerido)
 *  - message {string}          Cuerpo de la confesión (requerido)
 *  - from    {string|null}     Autor — null cuando es anónima (opcional)
 *  - date    {string}          Fecha en texto legible (requerido)
 */
import './ConfessionCard.css'

export function ConfessionCard({ to, message, from = null, date }) {
  return (
    <article className="confession-card card card-paper">
      {/* Encabezado: destinatario */}
      <header className="confession-card-header">
        <span className="confession-card-to-label">Para</span>
        <span className="confession-card-to">{to}</span>
      </header>

      {/* Cuerpo del mensaje — estilo de líneas de cuaderno */}
      <div className="confession-card-body notebook-lines">
        <p className="confession-card-message">{message}</p>
      </div>

      {/* Pie: autor y fecha */}
      <footer className="confession-card-footer">
        <span className="confession-card-from">
          {from ? (
            <>De: <strong>{from}</strong></>
          ) : (
            <span className="confession-card-anonymous">Anónimo/a ✨</span>
          )}
        </span>
        <time className="confession-card-date" dateTime={date}>{date}</time>
      </footer>
    </article>
  )
}
