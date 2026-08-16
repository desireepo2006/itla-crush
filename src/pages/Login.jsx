/**
 * Login — ITLA Crush
 *
 * Vista de Inicio de Sesión.
 */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/auth'
import './Register.css' // Reutilizando clases del sistema de diseño actual

export function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (error) setError(null)
  }

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!form.email.trim() || !form.password.trim()) {
      setError('Por favor completa todos los campos.')
      return
    }

    setLoading(true)
    const result = await loginUser(form)
    setLoading(false)

    if (!result.success) {
      setError(result.error)
      return
    }

    console.log("Sesión iniciada")
    setForm({ email: '', password: '' })
    navigate('/')
  }

  return (
    <div className="reg">
      <section className="reg-hero">
        <div className="container">
          <span className="badge badge-accent">👋 Bienvenido</span>
          <h1 className="reg-hero-title">Iniciar Sesión</h1>
          <p className="reg-hero-subtitle">
            Ingresa a tu cuenta para seguir confesando.
          </p>
        </div>
      </section>

      <section className="reg-body">
        <div className="container">
          <div className="reg-card card card-paper">
            <form className="reg-form" onSubmit={handleSubmit} noValidate>
              
              {error && (
                <div className="reg-error" role="alert">
                  <span aria-hidden="true">⚠️</span> {error}
                </div>
              )}

              <div className="reg-field">
                <label htmlFor="login-email" className="reg-label">
                  Correo electrónico <span className="reg-required" aria-hidden="true">*</span>
                </label>
                <input
                  id="login-email"
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

              <div className="reg-field">
                <label htmlFor="login-password" className="reg-label">
                  Contraseña <span className="reg-required" aria-hidden="true">*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className="reg-input"
                    placeholder="Tu contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    style={{ paddingRight: '2.5rem' }}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={{
                      position: 'absolute',
                      right: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      padding: 0,
                      color: 'var(--color-text-muted)'
                    }}
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg reg-submit"
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Entrar'}
              </button>

              <p className="reg-login-link">
                ¿No tienes cuenta?{' '}
                <Link to="/registro">Regístrate aquí</Link>
              </p>

            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
