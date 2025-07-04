import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './search.css';

function normalizeText(text) {
  return text
    .normalize('NFD')                 // descompone caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // elimina marcas diacríticas (acentos)
    .toLowerCase();
}

export default function SearchResults({ allVideos = [] }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('query') || '';
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredVideos([]);
      return;
    }

    const normalizedWords = normalizeText(query.trim()).split(/\s+/);

    const matchAllWords = (text) => {
      if (!text) return false;
      const normalizedText = normalizeText(text);
      return normalizedWords.every(word => normalizedText.includes(word));
    };

    const matchAllWordsInArray = (arr) => {
      if (!Array.isArray(arr) || arr.length === 0) return false;
      return arr.some(item => matchAllWords(item));
    };

    const results = [];

    allVideos.forEach(video => {
      if (matchAllWords(video.title)) {
        results.push({ video, category: 'Título' });
      } else if (matchAllWordsInArray(video.cast)) {
        results.push({ video, category: 'Actor' });
      } else if (video.language && matchAllWords(video.language)) {
        results.push({ video, category: 'Idioma' });
      } else if (matchAllWordsInArray(video.genres)) {
        results.push({ video, category: 'Género' });
      }
    });

    setFilteredVideos(results);

  }, [query, allVideos]);

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
          {filteredVideos.map(({ video, category }) => (
            <li
              key={video.id}
              className="search-results__item"
              onClick={() => handleResultClick(video.id)}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') handleResultClick(video.id) }}
              role="button"
              aria-pressed="false"
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
                <p className="search-results__item-category">Encontrado en: {category}</p>
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