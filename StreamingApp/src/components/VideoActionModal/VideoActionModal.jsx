import React from 'react'

export default function VideoActionModal({ video, actionType, onConfirm }) {
  const isRent = actionType === 'rentar'

  return (
<div
  className="modal fade"
  id="actionModal"
  tabIndex="-1"
  aria-labelledby="actionModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">
          {isRent ? 'Rentar Video' : 'Comprar Video'}
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Cerrar"
        ></button>
      </div>
      <div className="modal-body">
        {video && (
          <>
            <p>
              Estás a punto de <strong>{actionType}</strong> el video:
              <br />
              <strong>{video.title}</strong>
            </p>
            {isRent && (
              <div className="alert alert-info">
                Este video estará disponible por 7 días.
              </div>
            )}
            <form>
              <div className="mb-3">
                <label className="form-label">Número de tarjeta</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre en la tarjeta</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Juan Pérez"
                />
              </div>
              <div className="row">
                <div className="col">
                  <label className="form-label">Fecha de expiración</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MM/AA"
                  />
                </div>
                <div className="col">
                  <label className="form-label">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="123"
                  />
                </div>
              </div>
            </form>
          </>
        )}
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Cancelar
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onConfirm} // Aquí sólo la función, sin data-bs-dismiss o toggle
        >
          Confirmar {actionType}
        </button>
      </div>
    </div>
  </div>
</div>
  )
}