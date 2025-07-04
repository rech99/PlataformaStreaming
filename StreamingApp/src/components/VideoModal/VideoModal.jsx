import React from 'react'
import { useNavigate } from 'react-router-dom'
import './VideoModal.css'

export default function VideoModal({ video, onClose }) {
  const { id, title, url, year, synopsis } = video
  const navigate = useNavigate()

  const handleVerDetalles = () => {
    navigate(`/pelicula/${id}`)
  }

  return (
    <div
      className="video-modal"
      role="dialog"
      onClick={onClose}
    >
      <div className="video-modal__dialog" onClick={e => e.stopPropagation()}>
        <div className="video-modal__content">
          <div className="video-modal__header">
            <h5 className="video-modal__title">{title} ({year})</h5>
            <button type="button" className="video-modal__close-btn" onClick={onClose} aria-label="Cerrar modal">×</button>
          </div>

          <div className="video-modal__body">
            <p className="video-modal__synopsis">{synopsis}</p>

            {url.includes('youtube.com') ? (
              <iframe
                className="video-modal__video"
                height="400"
                src={`https://www.youtube.com/embed/${url.split('v=')[1]}`}
                title={title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <video className="video-modal__video" height="400" controls>
                <source src={url} />
                Tu navegador no soporta video.
              </video>
            )}

            <div className="video-modal__footer">
              <button className="video-modal__details-button" onClick={handleVerDetalles}>
                Ver detalles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}