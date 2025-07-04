
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import './Navbar.css';

export default function Navbar({ allVideos = [], loading = true, error = null }) {


  const handleSearch = (query) => {
    console.log('Buscar:', query);
  };


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