import React from 'react'
import './LoadingIcon.css'

export default function LoadingIcon() {
  return (
    <div className="loading-icon" role="status" aria-label="Cargando">
      <div className="loading-icon__circle"></div>
    </div>
  )
}