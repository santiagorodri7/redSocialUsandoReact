import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../services/auth'
import './AuthPage.css'

const initialValues = {
  nombre: '',
  email: '',
  contrasena: '',
  confirmarContrasena: '',
  fecha_nacimiento: '',
  genero: '',
}

export default function AuthPage({ onAuthSuccess }) {
  const [mode, setMode] = useState('login')
  const [values, setValues] = useState(initialValues)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const isRegistering = mode === 'register'

  function updateField(event) {
    const { name, value } = event.target
    setValues((currentValues) => ({ ...currentValues, [name]: value }))
  }

  function changeMode(nextMode) {
    setMode(nextMode)
    setError('')
    setNotice('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setNotice('')

    if (isRegistering && values.contrasena !== values.confirmarContrasena) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setIsSubmitting(true)
    try {
      if (isRegistering) {
        await registerUser({
          nombre: values.nombre.trim(),
          email: values.email.trim(),
          contrasena: values.contrasena,
          fecha_nacimiento: values.fecha_nacimiento,
          genero: values.genero,
        })
        setValues((currentValues) => ({ ...currentValues, contrasena: '', confirmarContrasena: '' }))
        setMode('login')
        setNotice('Tu cuenta fue creada. Inicia sesión con tu correo y contraseña.')
        return
      }

      const result = await loginUser({
        email: values.email.trim(),
        contrasena: values.contrasena,
      })
      const user = result.usuario
      if (!user || user.id == null || !user.nombre || !user.email) {
        throw new Error('La API no devolvió los datos esperados del usuario.')
      }

      onAuthSuccess({ id: user.id, nombre: user.nombre, email: user.email })
      navigate('/', { replace: true })
    } catch (requestError) {
      setError(requestError.message || 'No se pudo completar la solicitud.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-brand" aria-hidden="true">R</div>
        <p className="auth-eyebrow">RED SOCIAL</p>
        <h1 id="auth-title">{isRegistering ? 'Crea tu cuenta' : 'Qué bueno verte'}</h1>
        <p className="auth-description">
          {isRegistering
            ? 'Regístrate para unirte a la comunidad y compartir con tus amigos.'
            : 'Inicia sesión para continuar en tu comunidad.'}
        </p>

        <div className="auth-tabs" role="tablist" aria-label="Acceso a tu cuenta">
          <button
            type="button"
            role="tab"
            aria-selected={!isRegistering}
            className={!isRegistering ? 'is-active' : ''}
            onClick={() => changeMode('login')}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isRegistering}
            className={isRegistering ? 'is-active' : ''}
            onClick={() => changeMode('register')}
          >
            Registrarme
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegistering && (
            <label>
              Nombre completo
              <input
                name="nombre"
                type="text"
                autoComplete="name"
                value={values.nombre}
                onChange={updateField}
                maxLength={100}
                required
              />
            </label>
          )}

          <label>
            Correo electrónico
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={updateField}
              maxLength={100}
              required
            />
          </label>

          {isRegistering && (
            <>
              <label>
                Fecha de nacimiento
                <input
                  name="fecha_nacimiento"
                  type="date"
                  autoComplete="bday"
                  value={values.fecha_nacimiento}
                  onChange={updateField}
                  required
                />
              </label>
              <label>
                Género
                <select name="genero" value={values.genero} onChange={updateField} required>
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="Mujer">Mujer</option>
                  <option value="Hombre">Hombre</option>
                  <option value="Otro">Otro</option>
                </select>
              </label>
            </>
          )}

          <label>
            Contraseña
            <input
              name="contrasena"
              type="password"
              autoComplete={isRegistering ? 'new-password' : 'current-password'}
              value={values.contrasena}
              onChange={updateField}
              minLength={6}
              required
            />
          </label>

          {isRegistering && (
            <label>
              Confirmar contraseña
              <input
                name="confirmarContrasena"
                type="password"
                autoComplete="new-password"
                value={values.confirmarContrasena}
                onChange={updateField}
                minLength={6}
                required
              />
            </label>
          )}

          {error && <p className="auth-message auth-error" role="alert">{error}</p>}
          {notice && <p className="auth-message auth-success" role="status">{notice}</p>}

          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Procesando…' : isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="auth-security-note">Tus datos se envían a la API de RedSocial.</p>
      </section>
    </main>
  )
}
