import React, { useState } from 'react'
import './RegisterForm.css'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, confirmPassword } = formData

    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor, completa todos los campos.')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setError('')
    console.log('Registro enviado:', formData)
    alert('Registro exitoso (simulado)')
    // Aquí llamarías a tu API de registro
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="register-form__title">Crear cuenta</h2>

      {error && <p className="register-form__error">{error}</p>}

      <div className="register-form__group">
        <label htmlFor="name" className="register-form__label">Nombre completo</label>
        <input
          type="text"
          id="name"
          name="name"
          className="register-form__input"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />
      </div>

      <div className="register-form__group">
        <label htmlFor="email" className="register-form__label">Correo electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          className="register-form__input"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
      </div>

      <div className="register-form__group">
        <label htmlFor="password" className="register-form__label">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          className="register-form__input"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
      </div>

      <div className="register-form__group">
        <label htmlFor="confirmPassword" className="register-form__label">Confirmar contraseña</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="register-form__input"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
      </div>

      <button type="submit" className="register-form__button">
        Registrarse
      </button>
    </form>
  )
}