import React, { useState } from 'react'; 

import './VideoActionModal.css';

export default function VideoActionModal({ video, actionType, onConfirm }) {
  const isRent = actionType === 'rentar';


  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');


  const [errors, setErrors] = useState({});


  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    const cleanedCardNumber = cardNumber.replace(/\s/g, '');
    if (!cleanedCardNumber) {
      newErrors.cardNumber = 'El número de tarjeta es obligatorio.';
      isValid = false;
    } else if (!/^\d{13,19}$/.test(cleanedCardNumber)) { 
      newErrors.cardNumber = 'Número de tarjeta inválido (13-19 dígitos numéricos).';
      isValid = false;
    }

    if (!cardName.trim()) {
      newErrors.cardName = 'El nombre en la tarjeta es obligatorio.';
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(cardName.trim())) { 
      newErrors.cardName = 'El nombre solo debe contener letras.';
      isValid = false;
    }

    if (!expirationDate.trim()) {
      newErrors.expirationDate = 'La fecha de expiración es obligatoria.';
      isValid = false;
    } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expirationDate.trim())) {
      newErrors.expirationDate = 'Formato de fecha inválido (MM/AA).';
      isValid = false;
    } else {
        // Validación de fecha futura
        const [month, year] = expirationDate.split('/').map(Number);
        const currentYear = new Date().getFullYear() % 100; 
        const currentMonth = new Date().getMonth() + 1; 

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            newErrors.expirationDate = 'La tarjeta ha expirado.';
            isValid = false;
        }
    }



    if (!cvv.trim()) {
      newErrors.cvv = 'El CVV es obligatorio.';
      isValid = false;
    } else if (!/^\d{3,4}$/.test(cvv.trim())) { 
      newErrors.cvv = 'CVV inválido (3 dígitos numéricos).';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const formatExpirationDate = (value) => {

    const cleaned = value.replace(/\D/g, '');
    let formatted = cleaned;

    if (cleaned.length > 2) {
      formatted = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4); 
    }

    return formatted.substring(0, 5);
  };

  // 4. Modificar el manejador de confirmación
  const handleConfirmAction = () => {
    if (validateForm()) {
      // Si la validación es exitosa, llama a la función onConfirm pasada por props
      onConfirm();
    }
  };

  // Función para formatear el número de tarjeta (opcional, para mejor UX)
  const formatCardNumber = (value) => {
    // Elimina caracteres no numéricos
    const cleaned = value.replace(/\D/g, '');
    // Agrupa cada 4 dígitos
    return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  return (
    <div
      className="modal fade"
      id="actionModal"
      tabIndex="-1"
      aria-labelledby="actionModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog video-action-modal__dialog modal-dialog-centered">
        <div className="modal-content video-action-modal__content">
          <div className="modal-header video-action-modal__header">
            <h5 className="modal-title video-action-modal__title" id="actionModalLabel">
              {isRent ? 'Rentar Video' : 'Comprar Video'}
            </h5>
            <button
              type="button"
              className="btn-close video-action-modal__close-btn"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="modal-body video-action-modal__body">
            {video && (
              <>
                <p>
                  Estás a punto de <strong>{actionType}</strong> el video:
                  <br />
                  <strong>{video.title}</strong>
                </p>
                {isRent && (
                  <div className="alert alert-info video-action-modal__alert">
                    Este video estará disponible por 7 días.
                  </div>
                )}

                <form className="video-action-modal__form">
                  <div className="mb-3">
                    <label htmlFor="cardNumber" className="form-label">Número de tarjeta</label>
                    <input
                      type="text"
                      className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`} // Agrega clase is-invalid
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} // Formatear mientras se escribe
                      maxLength="19" // Max. longitud considerando espacios
                    />
                    {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>} {/* Mensaje de error */}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cardName" className="form-label">Nombre en la tarjeta</label>
                    <input
                      type="text"
                      className={`form-control ${errors.cardName ? 'is-invalid' : ''}`} // Agrega clase is-invalid
                      id="cardName"
                      placeholder="Juan Pérez"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                    {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>} {/* Mensaje de error */}
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="expirationDate" className="form-label">Fecha de expiración</label>
                      <input
                        type="text"
                        className={`form-control ${errors.expirationDate ? 'is-invalid' : ''}`}
                        id="expirationDate"
                        placeholder="MM/AA"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(formatExpirationDate(e.target.value))}
                        maxLength="5" 
                      />
                      {errors.expirationDate && <div className="invalid-feedback">{errors.expirationDate}</div>} 
                    </div>
                    <div className="col">
                      <label htmlFor="cvv" className="form-label">CVV</label>
                      <input
                        type="text"
                        className={`form-control ${errors.cvv ? 'is-invalid' : ''}`} 
                        id="cvv"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength="3" 
                      />
                      {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>} 
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
          <div className="modal-footer video-action-modal__footer">
            <button
              type="button"
              className="btn btn-secondary video-action-modal__btn video-action-modal__btn--secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary video-action-modal__btn video-action-modal__btn--primary"
              onClick={handleConfirmAction} 
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}