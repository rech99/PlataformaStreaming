import React from 'react';
import './misc.css'; 

export default function About() {
  return (
    <div className="page">
      <h1 className="page__title">Acerca de Nosotros</h1>
      <p className="page__paragraph">
        Esta aplicación muestra videos para que los usuarios puedan explorarlos y disfrutarlos.
      </p>
      <p className="page__paragraph">
        Estamos comprometidos con la mejor experiencia de usuario.
      </p>
    </div>
  );
}