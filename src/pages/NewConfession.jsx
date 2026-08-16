/**
 * NewConfession — ITLA Crush
 *
 * Vista para crear una nueva confesión romántica.
 * Incluye selector visual de los 4 estilos de carta del sistema de diseño.
 *
 * Fase 4: cuando Firebase esté listo, el onSubmit enviará los datos a Firestore.
 * Por ahora hace console.log con los datos del formulario.
 */
import { useState } from 'react'
import './NewConfession.css'

/** Los 4 estilos de carta definidos en el PROJECT_CONTEXT */
const STYLES = [
  {
    id: 'notebook',
    label: 'Cuaderno',
    icon: '📓',
    description: 'Hoja con líneas azules y márgenes',
    previewClass: 'nc-preview--notebook',
  },
  {
    id: 'post',
    label: 'Post Normal',
    icon: '🗒️',
    description: 'Tarjeta limpia y minimalista',
    previewClass: 'nc-preview--post',
  },
  {
    id: 'postit',
    label: 'Post-it',
    icon: '📌',
    description: 'Nota adhesiva amarilla',
    previewClass: 'nc-preview--postit',
  },
  {
    id: 'heart',
    label: 'Corazón',
    icon: '❤️',
    description: 'Carta romántica con forma de corazón',
    previewClass: 'nc-preview--heart',
  },
]

const INITIAL_FORM = {
  to: '',
  message: '',
  from: '',
  style: 'notebook',
}

export function NewConfession() {
  const [form, setForm] = useState(INITIAL_FORM)

  /** Actualiza un campo del formulario de forma genérica */
  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  /** Selecciona el estilo de carta */
  function handleStyleChange(styleId) {
    setForm((prev) => ({ ...prev, style: styleId }))
  }

  /** Envía el formulario — Firebase en Fase 4 */
  function handleSubmit(e) {
    e.preventDefault()
    console.log('Nueva confesión:', {
      to: form.to,
      message: form.message,
      from: form.from || null,
      style: form.style,
    })
  }

  const selectedStyle = STYLES.find((s) => s.id === form.style)

  return (
    <div className="nc">
      {/* ── Hero ── */}
      <section className="nc-hero">
        <div className="container">
          <span className="badge badge-accent">💌 Nueva Confesión</span>
          <h1 className="nc-hero-title">Escribe tu confesión</h1>
          <p className="nc-hero-subtitle">
            Elige cómo quieres que luzca tu mensaje y envíalo al universo.
          </p>
        </div>
      </section>

      {/* ── Layout principal: formulario + preview ── */}
      <section className="nc-body">
        <div className="container">
          <div className="nc-layout">

            {/* ── Columna izquierda: formulario ── */}
            <form className="nc-form" onSubmit={handleSubmit} noValidate>

              {/* Para quién */}
              <div className="nc-field">
                <label htmlFor="nc-to" className="nc-label">
                  Para <span className="nc-label-required" aria-hidden="true">*</span>
                </label>
                <input
                  id="nc-to"
                  name="to"
                  type="text"
                  className="nc-input"
                  placeholder="¿A quién va dirigida tu confesión?"
                  value={form.to}
                  onChange={handleChange}
                  required
                  maxLength={100}
                />
              </div>

              {/* El mensaje */}
              <div className="nc-field">
                <label htmlFor="nc-message" className="nc-label">
                  Tu confesión <span className="nc-label-required" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="nc-message"
                  name="message"
                  className="nc-textarea"
                  placeholder="Escribe lo que sientes... nadie más tiene que saberlo."
                  value={form.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={500}
                  rows={6}
                />
                <span className="nc-char-count">
                  {form.message.length} / 500
                </span>
              </div>

              {/* De quién (opcional) */}
              <div className="nc-field">
                <label htmlFor="nc-from" className="nc-label">
                  De <span className="nc-label-optional">(opcional — déjalo vacío para ser anónimo/a)</span>
                </label>
                <input
                  id="nc-from"
                  name="from"
                  type="text"
                  className="nc-input"
                  placeholder="Tu nombre o apodo..."
                  value={form.from}
                  onChange={handleChange}
                  maxLength={80}
                />
              </div>

              {/* ── Selector de estilo ── */}
              <fieldset className="nc-style-fieldset">
                <legend className="nc-label">Presentación visual</legend>
                <div className="nc-style-grid">
                  {STYLES.map((style) => (
                    <label
                      key={style.id}
                      className={`nc-style-option${form.style === style.id ? ' nc-style-option--active' : ''}`}
                    >
                      <input
                        type="radio"
                        name="style"
                        value={style.id}
                        checked={form.style === style.id}
                        onChange={() => handleStyleChange(style.id)}
                        className="nc-style-radio"
                      />
                      <span className="nc-style-icon" aria-hidden="true">{style.icon}</span>
                      <span className="nc-style-name">{style.label}</span>
                      <span className="nc-style-desc">{style.description}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Botón de envío */}
              <div className="nc-actions">
                <button type="submit" className="btn btn-accent btn-lg nc-submit">
                  Enviar confesión ❤️
                </button>
              </div>
            </form>

            {/* ── Columna derecha: preview dinámica ── */}
            <aside className="nc-preview-panel">
              <p className="nc-preview-label">Vista previa</p>
              <div className={`nc-preview ${selectedStyle?.previewClass ?? ''}`}>
                <div className="nc-preview-to">
                  Para: <strong>{form.to || 'alguien especial...'}</strong>
                </div>
                <div className="nc-preview-message">
                  {form.message || 'Tu mensaje aparecerá aquí mientras escribes.'}
                </div>
                <div className="nc-preview-from">
                  — {form.from || 'Anónimo/a ✨'}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </div>
  )
}
