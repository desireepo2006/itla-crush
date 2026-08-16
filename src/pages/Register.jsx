/**
 * Register — ITLA Crush
 *
 * Vista de Registro de Usuarios.
 * Crea la cuenta en Firebase Auth y guarda el perfil en Firestore.
 */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/auth'
import './Register.css'

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
}

export function Register() {
  const [form, setForm]       = useState(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Limpia el error cuando el usuario empieza a corregir
    if (error) setError(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    // Validación básica en el cliente
    if (!form.firstName.trim() || !form.lastName.trim() || !form.username.trim()) {
      setError('Por favor completa todos los campos obligatorios.')
      return
    }

    setLoading(true)
    const result = await registerUser(form)
    setLoading(false)

    if (!result.success) {
      setError(result.error)
      return
    }

    // Registro exitoso → redirigir al home
    navigate('/')
  }

  return (
    <div className="reg">
      {/* ── Hero ── */}
      <section className="reg-hero">
        <div className="container">
          <span className="badge badge-accent">✨ Únete</span>
          <h1 className="reg-hero-title">Crea tu cuenta</h1>
          <p className="reg-hero-subtitle">
            Empieza a confesar tu crush en el ITLA.
          </p>
        </div>
      </section>

      {/* ── Form ── */}
      <section className="reg-body">
        <div className="container">
          <div className="reg-card card card-paper">
            <form className="reg-form" onSubmit={handleSubmit} noValidate>

              {/* Error banner */}
              {error && (
                <div className="reg-error" role="alert">
                  <span aria-hidden="true">⚠️</span> {error}
                </div>
              )}

              {/* Nombre + Apellido — dos columnas */}
              <div className="reg-row">
                <div className="reg-field">
                  <label htmlFor="reg-firstName" className="reg-label">
                    Nombre <span className="reg-required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="reg-firstName"
                    name="firstName"
                    type="text"
                    className="reg-input"
                    placeholder="Tu nombre"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    maxLength={50}
                    autoComplete="given-name"
                  />
                </div>

                <div className="reg-field">
                  <label htmlFor="reg-lastName" className="reg-label">
                    Apellido <span className="reg-required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="reg-lastName"
                    name="lastName"
                    type="text"
                    className="reg-input"
                    placeholder="Tu apellido"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    maxLength={50}
                    autoComplete="family-name"
                  />
                </div>
              </div>

              {/* Username */}
              <div className="reg-field">
                <label htmlFor="reg-username" className="reg-label">
                  Nombre de usuario <span className="reg-required" aria-hidden="true">*</span>
                </label>
                <div className="reg-input-prefix-wrap">
                  <span className="reg-input-prefix" aria-hidden="true">@</span>
                  <input
                    id="reg-username"
                    name="username"
                    type="text"
                    className="reg-input reg-input--prefixed"
                    placeholder="tu_usuario"
                    value={form.username}
                    onChange={handleChange}
                    required
                    maxLength={30}
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="reg-field">
                <label htmlFor="reg-email" className="reg-label">
                  Correo electrónico <span className="reg-required" aria-hidden="true">*</span>
                </label>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  className="reg-input"
                  placeholder="tu@correo.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div className="reg-field">
                <label htmlFor="reg-password" className="reg-label">
                  Contraseña <span className="reg-required" aria-hidden="true">*</span>
                </label>
                <input
                  id="reg-password"
                  name="password"
                  type="password"
                  className="reg-input"
                  placeholder="Mínimo 6 caracteres"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
                <span className="reg-hint">
                  Mínimo 6 caracteres. No la compartas con nadie.
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary btn-lg reg-submit"
                disabled={loading}
              >
                {loading ? 'Creando cuenta...' : 'Crear cuenta 🎉'}
              </button>

              {/* Link a login (futuro) */}
              <p className="reg-login-link">
                ¿Ya tienes cuenta?{' '}
                <Link to="/">Volver al inicio</Link>
              </p>

            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
