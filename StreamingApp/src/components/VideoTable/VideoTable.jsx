// src/components/VideoTable/VideoTable.jsx
import React, { useState, useMemo } from 'react'

import './VideoTable.css'
import VideoActionModal from '../VideoActionModal/VideoActionModal'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'
import Modal from 'bootstrap/js/dist/modal'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import { useNavigate } from 'react-router-dom'


export default function VideoTable({ videos = [], loading = true, error = null }) {

  const [selectedVideo, setSelectedVideo] = useState(null)
  const [actionType, setActionType] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const videosPerPage = 10

  const currentVideos = useMemo(() => {
    const startIndex = (currentPage - 1) * videosPerPage
    const endIndex = startIndex + videosPerPage
    return videos.slice(startIndex, endIndex)
  }, [videos, currentPage])


  const totalPages = Math.ceil((videos ? videos.length : 0) / videosPerPage)

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum)
    }
  }

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

    setTimeout(() => {
      setShowConfirmation(true)
      const confirmModalEl = document.getElementById('confirmationModal')
      const confirmModal = Modal.getOrCreateInstance(confirmModalEl)
      confirmModal.show()
    }, 300)
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


  if (loading) return <div className="loading-container"> <LoadingIcon /> </div>
  if (error) return <p>Error cargando videos: {error.message}</p>

  return (
    <>
      <table className="video-table">
        <thead className="video-table__head">
          <tr className="video-table__row">
            <th className="video-table__header">Título</th>
            <th className="video-table__header">Imagen</th>
            <th className="video-table__header">Año</th>
            <th className="video-table__header">Sinopsis</th>
            <th className="video-table__header">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentVideos.map(({ id, title, thumbnail, year, synopsis }) => (
            <tr key={id} className="video-table__row">
              <td className="video-table__cell">{title}</td>
              <td className="video-table__cell">
                <img
                  src={thumbnail}
                  alt={`Miniatura de ${title}`}
                  className="video-table__thumbnail"
                />
              </td>
              <td className="video-table__cell">{year}</td>
              <td className="video-table__cell">{synopsis}</td>
              <td className="video-table__cell video-table__cell--actions">
                <button
                  className="video-table__button video-table__button--detail"
                  onClick={() => navigate(`/pelicula/${id}`)}
                >
                  Ver Detalles
                </button>
                <button
                  className="video-table__button video-table__button--buy"
                  onClick={() => handleOpen({ id, title }, 'comprar')}
                >
                  Comprar
                </button>
                <button
                  className="video-table__button video-table__button--rent"
                  onClick={() => handleOpen({ id, title }, 'rentar')}
                >
                  Rentar
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
      <div className="pagination-container">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => goToPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Siguiente
        </button>
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
    </>
  )
}