import React from 'react'

export default function ConfirmationModal({ video, actionType }) {
  return (
    <div
      className="modal fade"
      id="confirmationModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">¡Transacción exitosa!</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Has <strong>{actionType === 'rentar' ? 'rentado' : 'comprado'}</strong>{' '}
              el video <strong>{video?.title}</strong> correctamente.
            </p>
            {actionType === 'rentar' && (
              <p className="text-muted">
                Recuerda: tienes 7 días para ver este contenido.
              </p>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-success" data-bs-dismiss="modal">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}