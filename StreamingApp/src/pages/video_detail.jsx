import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useVideos from '../hooks/useVideos'
import LoadingIcon from '../components/LoadingIcon/LoadingIcon'
import VideoActionModal from '../components/VideoActionModal/VideoActionModal'
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal'
import Modal from 'bootstrap/js/dist/modal'
import './video_detail.css'

export default function VideoDetail() {
  // Todos los hooks aquí, sin condicionales:
  const { id } = useParams()
  const { videos, loading, error } = useVideos()

  const [selectedVideo, setSelectedVideo] = useState(null)
  const [actionType, setActionType] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Siempre declarar hooks arriba, luego calcular video
  const video = videos.find(v => v.id === id)

  // Uso de efecto para mostrar modal confirmación solo si showConfirmation cambia
  useEffect(() => {
    if (showConfirmation) {
      const confirmModalEl = document.getElementById('confirmationModal')
      if (confirmModalEl) {
        const confirmModal = Modal.getOrCreateInstance(confirmModalEl)
        confirmModal.show()
      }
    }
  }, [showConfirmation])

  // Funciones de handlers
  const handleOpen = (video, action) => {
    setSelectedVideo(video)
    setActionType(action)
    setShowConfirmation(false)

    setTimeout(() => {
      const modalEl = document.getElementById('actionModal')
      if (modalEl) {
        const modal = Modal.getOrCreateInstance(modalEl)
        modal.show()
      }
    }, 0)
  }

  const handleConfirm = () => {
    const modalEl = document.getElementById('actionModal')
    const modalInstance = Modal.getInstance(modalEl)
    if (modalInstance) {
      modalInstance.hide()
    }
    setShowConfirmation(true)
  }

  const handleCloseConfirmation = () => {
    const confirmModalEl = document.getElementById('confirmationModal')
    const confirmModalInstance = Modal.getInstance(confirmModalEl)
    if (confirmModalInstance) {
      confirmModalInstance.hide()
    }

    setShowConfirmation(false)
    setSelectedVideo(null)
    setActionType('')
  }

  // Aquí solo condiciones de renderizado, no hooks ni estados
  if (loading) return <div className="vd-loading-container"><LoadingIcon /></div>
  if (error) return <p>Error al cargar el video: {error.message}</p>
  if (!video) return <p>Video no encontrado</p>

  const {
    title,
    director,
    year,
    duration,
    reviews,
    synopsis,
    thumbnail,
    language, 
    cast = [] 
  } = video

  return (
    <div className="vd-container">
      <div className="vd-header">
        <h1>{title} </h1>
        <p className="vd-year"><strong>Año:</strong>{year}</p>
        <p className="vd-director"><strong>Director:</strong> {director}</p>
        <p className="vd-cast"><strong>Reparto:</strong> {cast.join(', ')}</p>
        <p className="vd-duration"><strong>Duración:</strong> {duration}</p>
        <p className="vd-language"><strong>Idioma:</strong> {language}</p>
      </div>

      <div className="vd-main">
        <img className="vd-thumbnail" src={thumbnail} alt={title} />
        <div className="vd-details">
          <h2>Sinopsis</h2>
          <p>{synopsis}</p>

          <h2>Críticas</h2>
          <ul>
            {reviews.map((review, idx) => (
              <li key={idx}>{review}</li>
            ))}
          </ul>

          <div className="vd-actions">
            <button
              className="vd-watch-link"
              onClick={() => handleOpen(video, 'comprar')}
            >
              Comprar
            </button>
            <button
              className="vd-watch-link"
              onClick={() => handleOpen(video, 'rentar')}
            >
              Rentar
            </button>
          </div>
        </div>
      </div>

      {!showConfirmation && selectedVideo && (
        <VideoActionModal
          video={selectedVideo}
          actionType={actionType}
          onConfirm={handleConfirm}
        />
      )}

      {showConfirmation && selectedVideo && (
        <ConfirmationModal
          video={selectedVideo}
          actionType={actionType}
          onClose={handleCloseConfirmation}
        />
      )}
    </div>
  )
}

