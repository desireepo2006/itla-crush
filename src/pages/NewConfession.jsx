/**
 * NewConfession — ITLA Crush
 *
 * Vista para crear una nueva confesión romántica.
 * Incluye selector visual de los 4 estilos de carta del sistema de diseño.
 */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuth } from '../context/AuthContext'
import './NewConfession.css'

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
  toId: '',
  customTo: '',
  message: '',
  style: 'notebook',
  isPublic: true,
  isAnonymous: false,
}

export function NewConfession() {
  const { user, userData } = useAuth()
  const navigate = useNavigate()
  
  const [form, setForm] = useState(INITIAL_FORM)
  const [usersList, setUsersList] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchingUsers, setFetchingUsers] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'))
        const users = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setUsersList(users)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setFetchingUsers(false)
      }
    }
    fetchUsers()
  }, [])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
  }

  function handleStyleChange(styleId) {
    setForm((prev) => ({ ...prev, style: styleId }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!form.toId || !form.message.trim()) {
      alert("Por favor completa los campos obligatorios.")
      return
    }

    if (form.toId === 'OTRO' && !form.customTo.trim()) {
      alert("Por favor escribe el nombre del destinatario.")
      return
    }
    
    if (!user) {
      alert("Debes iniciar sesión para publicar una confesión.")
      return
    }

    setLoading(true)
    
    try {
      let recipientName = ''
      if (form.toId === 'OTRO') {
        recipientName = form.customTo.trim()
      } else {
        const selectedUser = usersList.find(u => u.id === form.toId)
        recipientName = selectedUser ? (selectedUser.username || selectedUser.firstName) : 'Desconocido'
      }

      await addDoc(collection(db, 'declarations'), {
        authorId: user.uid,
        authorName: userData?.firstName || userData?.username || 'Usuario',
        recipientId: form.toId === 'OTRO' ? null : form.toId,
        recipientName,
        isPublic: form.isPublic,
        isAnonymous: form.isAnonymous,
        body: form.message,
        font: 'default',
        backgroundStyle: form.style,
        createdAt: serverTimestamp()
      })

      alert("¡Confesión enviada con éxito! ❤️")
      navigate('/')
    } catch (error) {
      console.error("Error saving declaration:", error)
      alert("Hubo un error al enviar tu confesión. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const selectedStyle = STYLES.find((s) => s.id === form.style)
  
  // Para la vista previa
  let previewTo = 'alguien especial...'
  if (form.toId) {
    if (form.toId === 'OTRO') {
      previewTo = form.customTo || 'alguien especial...'
    } else {
      const su = usersList.find(u => u.id === form.toId)
      previewTo = su ? (su.username || su.firstName) : 'alguien especial...'
    }
  }

  return (
    <div className="nc">
      <section className="nc-hero">
        <div className="container">
          <span className="badge badge-accent">💌 Nueva Confesión</span>
          <h1 className="nc-hero-title">Escribe tu confesión</h1>
          <p className="nc-hero-subtitle">
            Elige cómo quieres que luzca tu mensaje y envíalo al universo.
          </p>
        </div>
      </section>

      <section className="nc-body">
        <div className="container">
          <div className="nc-layout">
            <form className="nc-form" onSubmit={handleSubmit} noValidate>
              
              <div className="nc-field">
                <label htmlFor="nc-to" className="nc-label">
                  Para <span className="nc-label-required" aria-hidden="true">*</span>
                </label>
                <select
                  id="nc-to"
                  name="toId"
                  className="nc-input"
                  value={form.toId}
                  onChange={handleChange}
                  required
                  disabled={fetchingUsers}
                >
                  <option value="" disabled>
                    {fetchingUsers ? 'Cargando usuarios...' : '¿A quién va dirigida tu confesión?'}
                  </option>
                  {usersList.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.firstName} {u.lastName ? `${u.lastName} ` : ''}(@{u.username})
                    </option>
                  ))}
                  <option value="OTRO">OTRO</option>
                </select>
              </div>

              {form.toId === 'OTRO' && (
                <div className="nc-field">
                  <label htmlFor="nc-custom-to" className="nc-label">
                    Nombre del destinatario <span className="nc-label-required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="nc-custom-to"
                    name="customTo"
                    type="text"
                    className="nc-input"
                    placeholder="Escribe el nombre de tu crush..."
                    value={form.customTo}
                    onChange={handleChange}
                    required
                    maxLength={100}
                  />
                </div>
              )}

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

              <div className="nc-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span className="nc-label">Privacidad</span>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={form.isPublic}
                    onChange={handleChange}
                  />
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text)' }}>Hacer declaración pública</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="isAnonymous"
                    checked={form.isAnonymous}
                    onChange={handleChange}
                  />
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text)' }}>Enviar de forma anónima</span>
                </label>
              </div>

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

              <div className="nc-actions">
                <button type="submit" className="btn btn-accent btn-lg nc-submit" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar confesión ❤️'}
                </button>
              </div>
            </form>

            <aside className="nc-preview-panel">
              <p className="nc-preview-label">Vista previa</p>
              <div className={`nc-preview ${selectedStyle?.previewClass ?? ''}`}>
                <div className="nc-preview-to">
                  Para: <strong>{previewTo}</strong>
                </div>
                <div className="nc-preview-message">
                  {form.message || 'Tu mensaje aparecerá aquí mientras escribes.'}
                </div>
                <div className="nc-preview-from">
                  — {form.isAnonymous ? 'Anónimo/a ✨' : (userData?.firstName || 'Tu admirador/a secret@')}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </div>
  )
}
