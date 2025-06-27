import React from 'react'
import { Link, NavLink } from 'react-router-dom' 
import SearchBar from '../SearchBar/SearchBar'
import './Navbar.css'
import useVideos from '../../hooks/useVideos'

export default function Navbar() {
  const { videos, loading, error } = useVideos()


  const handleSearch = (query) => {
    console.log('Buscar:', query)
  }

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error al cargar videos</p>

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

          <SearchBar videos={videos || []} onSearch={handleSearch} />
        </div>
      </div>
    </header>
  )
}