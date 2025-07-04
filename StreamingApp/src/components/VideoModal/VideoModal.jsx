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
      className="modal fade show"
      tabIndex="-1"
      style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      role="dialog"
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg" onClick={e => e.stopPropagation()}>
        <div className="modal-content bg-dark text-white">
          <div className="modal-header border-0">
            <h5 className="modal-title" style={{ color: '#e50914' }}>{title} ({year})</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Cerrar modal"></button>
          </div>
          <div className="modal-body">
            <p>{synopsis}</p>
            {url.includes('youtube.com') ? (
              <iframe
                className="w-100"
                height="400"
                src={`https://www.youtube.com/embed/${url.split('v=')[1]}`}
                title={title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <video className="w-100" height="400" controls>
                <source src={url} />
                Tu navegador no soporta video.
              </video>
            )}
            <div className="mt-3 text-end">
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