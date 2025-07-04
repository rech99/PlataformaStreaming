import React, { useState, useEffect } from 'react'

import './VideoTable.css'
import VideoActionModal from '../VideoActionModal/VideoActionModal'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'
import Modal from 'bootstrap/js/dist/modal'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import { useNavigate } from 'react-router-dom'
import filterTable from '../../hooks/filterTable'

export default function VideoTable({ videos = [], loading = true, error = null }) {
  // Estado para modales de acciones
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [actionType, setActionType] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [shouldShowConfirmationModal, setShouldShowConfirmationModal] = useState(false)

  // Navegación
  const navigate = useNavigate()

  // Usamos el hook filterTable para manejar filtrado, orden, paginación
  const {
    paginatedVideos, 
    currentPage,
    setCurrentPage,
    totalPages,
    filterTitle,
    setFilterTitle,
    sortOrder,
    setSortOrder,
  } = filterTable(videos, 10) 

  // Abre modal de acción (comprar/rentar)
  const handleOpen = (video, action) => {
    setSelectedVideo(video)
    setActionType(action)
    setShowConfirmation(false)

    // Mostrar modal bootstrap con un pequeño delay para asegurar renderizado
    setTimeout(() => {
      const modalEl = document.getElementById('actionModal')
      if (modalEl) {
        const modal = Modal.getOrCreateInstance(modalEl)
        modal.show()
      }
    }, 0)
  }

  // Confirma la acción en el modal
  const handleConfirm = () => {
    const modalEl = document.getElementById('actionModal')
    const modalInstance = Modal.getInstance(modalEl)
    if (modalInstance) modalInstance.hide()

    setSelectedVideo((prev) => ({ ...prev })) // asegura que el video seleccionado persista
    setShowConfirmation(true)
    setShouldShowConfirmationModal(true)
  }

  // Muestra el modal de confirmación cuando se activa showConfirmation
  useEffect(() => {
    if (shouldShowConfirmationModal) {
      const confirmModalEl = document.getElementById('confirmationModal')
      if (confirmModalEl) {
        const confirmModal = Modal.getOrCreateInstance(confirmModalEl)
        confirmModal.show()
      }
      setShouldShowConfirmationModal(false)
    }
  }, [shouldShowConfirmationModal])

  // Cierra modal confirmación
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

  // Cambia de página
  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum)
    }
  }

  if (loading) return <div className="loading-container"><LoadingIcon /></div>
  if (error) return <p>Error cargando videos: {error.message}</p>

  return (
    <>
    <div className="video-table__wrapper">
      <br></br>
      <div className="video-table__controls">
        <div className="video-table__controls-left">
          <input
            type="text"
            placeholder="Filtrar por título..."
            value={filterTitle}
            onChange={e => setFilterTitle(e.target.value)}
            className="video-table__controls-input"
          />
        </div>

        <div className="video-table__controls-right">
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="video-table__controls-select"
          >
            <option value="title-asc">Título A → Z</option>
            <option value="title-desc">Título Z → A</option>
            <option value="genre-asc">Género A → Z</option>
            <option value="genre-desc">Género Z → A</option>
            <option value="year-asc">Año ↑</option>
            <option value="year-desc">Año ↓</option>
          </select>
        </div>
      </div>
      <br></br>

        {/* Tabla con los videos paginados y filtrados */}
        <table className="video-table">
          <thead className="video-table__head">
            <tr className="video-table__row">
              <th className="video-table__header">Título</th>
              <th className="video-table__header">Año</th>
              <th className="video-table__header">Género</th>
              <th className="video-table__header">Sinopsis</th>
              <th className="video-table__header">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedVideos.map(({ id, title, year, genres, synopsis, url }) => (
              <tr key={id} className="video-table__row">
                <td className="video-table__cell">{title}</td>
                <td className="video-table__cell">{year}</td>
                <td className="video-table__cell">{genres?.join(', ') || ''}</td>
                <td className="video-table__cell">{synopsis}</td>
                <td className="video-table__cell video-table__cell--actions">
                  <button
                    className="video-table__button video-table__button--detail"
                    onClick={() => navigate(`/pelicula/${id}`)}
                  >
                    <i className="bi bi-info-circle"></i>
                  </button>
                  <button
                    className="video-table__button video-table__button--buy"
                    onClick={() => handleOpen({ id, title, url }, 'comprar')}
                  >
                    <i className="bi bi-cart"></i>
                  </button>
                  <button
                    className="video-table__button video-table__button--rent"
                    onClick={() => handleOpen({ id, title, url }, 'rentar')}
                  >
                    <i className="bi bi-bag"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
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
      </div>

      {/* Modales */}
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