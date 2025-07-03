import React from 'react'
import './ConfirmationModal.css'

export default function ConfirmationModal({ video, actionType }) {
  return (
    <div
      className="modal fade"
      id="confirmationModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered confirmation-modal__dialog">
        <div className="modal-content confirmation-modal__content">
          <div className="modal-header confirmation-modal__header">
            <h5 className="modal-title confirmation-modal__title">¡Transacción exitosa!</h5>
            <button
              type="button"
              className="btn-close confirmation-modal__close-btn"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="modal-body confirmation-modal__body">
            <p>
              Has <strong>{actionType === 'rentar' ? 'rentado' : 'comprado'}</strong>{' '}
              la película <strong>{video?.title}</strong> correctamente.
            </p>
            {actionType === 'rentar' && (
              <p className="alert confirmation-modal__alert">
                Recuerda: tienes 7 días para ver este contenido.
              </p>
            )}
          </div>
          <div className="modal-footer confirmation-modal__footer">
            <button
              type="button"
              className="btn confirmation-modal__btn confirmation-modal__btn--primary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            {video?.url && (
              <a
                href={video.url}
                className="btn confirmation-modal__btn confirmation-modal__btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver película
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}