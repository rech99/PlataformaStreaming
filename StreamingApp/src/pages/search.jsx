import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './search.css'; 


export default function SearchResults({ allVideos = [] }) { // <--- Recibe allVideos aquí
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('query') || ''; // Obtiene el valor del parámetro 'query'
  const [filteredVideos, setFilteredVideos] = useState([]);

  // useEffect para filtrar los videos cada vez que el 'query' o 'allVideos' cambien
  useEffect(() => {
    if (!query.trim()) {
      setFilteredVideos([]);
      return;
    }

    const lowerCaseQueryWords = query.toLowerCase().trim().split(/\s+/);

    const filtered = allVideos.filter(video => {
      const title = video.title.toLowerCase();
      let lastIndex = -1;

      return lowerCaseQueryWords.every(word => {
        const index = title.indexOf(word, lastIndex + 1);
        if (index === -1) return false;
        lastIndex = index;
        return true;
      });
    });

    setFilteredVideos(filtered);
  }, [query, allVideos]); // <--- Dependencias cruciales para evitar bucle infinito

  const handleResultClick = (videoId) => {
    navigate(`/pelicula/${videoId}`);
  };

  return (
    <div className="search-results__container">
      {query ? (
        <h1>Resultados de búsqueda para: "{query}"</h1>
      ) : (
        <h1>Ingresa un término de búsqueda para ver resultados.</h1>
      )}

      {filteredVideos.length > 0 ? (
        <ul className="search-results__list">
          {filteredVideos.map(video => (
            <li
              key={video.id}
              className="search-results__item"
              onClick={() => handleResultClick(video.id)}
            >
              <img
                src={video.thumbnail}
                alt={`Miniatura de ${video.title}`}
                className="search-results__item-thumbnail"
              />
              <div className="search-results__item-info">
                <h2 className="search-results__item-title">{video.title}</h2>
                <p className="search-results__item-director">Director: {video.director}</p>
                <p className="search-results__item-year">Año: {video.year}</p>
                {/* Puedes añadir más información relevante aquí */}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        query && <p>No se encontraron resultados para "{query}".</p>
      )}
    </div>
  );
}