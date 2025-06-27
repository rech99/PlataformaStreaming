// src/components/Navbar/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import './Navbar.css';
// ¡Elimina esta importación! useVideos ya no se llama aquí
// import useVideos from '../../hooks/useVideos';

// MODIFICACIÓN: Navbar ahora recibe las props: allVideos, loading y error
export default function Navbar({ allVideos = [], loading = true, error = null }) {
  // ¡Elimina esta línea! Los datos vienen de las props
  // const { videos, loading, error } = useVideos();

  const handleSearch = (query) => {
    console.log('Buscar:', query);
  };

  // Puedes decidir si quieres mostrar un estado de carga o error en la barra de navegación.
  // Generalmente, no se bloquea toda la navegación por la carga de videos,
  // pero aquí tienes las comprobaciones si las necesitas.
  if (loading) return <p>Cargando navegación...</p>;
  if (error) return <p>Error en navegación</p>;

  return (
    <header className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          FoundFlix
        </Link>

        <div className="navbar__right">
          <nav className="navbar__menu" aria-label="Menú principal">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
              }
            >
              Inicio
            </NavLink>

            <NavLink
              to="/lista"
              className={({ isActive }) =>
                isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
              }
            >
              Lista
            </NavLink>
          </nav>

          {/* MODIFICACIÓN: Pasa 'allVideos' a SearchBar. SearchBar espera una prop 'videos'. */}
          <SearchBar videos={allVideos || []} onSearch={handleSearch} />
        </div>
      </div>
    </header>
  );
}