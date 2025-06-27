import React from 'react'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text">
          &copy; {year} StreamingApp. Todos los derechos reservados.
        </p>
        <nav className="footer__nav">
          <a href="/about" className="footer__link">Acerca de</a>
          <a href="/terms" className="footer__link">Términos de uso</a>
          <a href="/privacy" className="footer__link">Privacidad</a>
        </nav>
      </div>
    </footer>
  )
}