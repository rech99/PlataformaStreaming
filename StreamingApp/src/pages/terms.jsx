import React from 'react';
import './misc.css'; 

export default function Terms() {
  return (
    <div className="page">
      <h1 className="page__title">Términos de Uso</h1>
      <p className="page__paragraph">
        Al usar esta plataforma aceptas nuestros términos y condiciones.
      </p>
      <ul className="page__list">
        <li className="page__list-item">Uso responsable del contenido.</li>
        <li className="page__list-item">No distribuir material protegido.</li>
        <li className="page__list-item">Respeto a la privacidad y derechos de autor.</li>
      </ul>
    </div>
  );
}