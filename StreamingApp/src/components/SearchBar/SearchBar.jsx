import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchBar.css'

function normalizeText(text) {
  return text
    .normalize('NFD')               // descompone caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // elimina marcas diacríticas (acentos)
    .toLowerCase()
}

export default function SearchBar({ videos = [] }) {
  const [query, setQuery] = useState('')
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionsRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!query.trim()) {
      setFilteredSuggestions([])
      setShowSuggestions(false)
      return
    }

    const normalizedWords = normalizeText(query.trim()).split(/\s+/)

    const matchAllWords = (text) => {
      if (!text) return false
      const normalizedText = normalizeText(text)
      return normalizedWords.every(word => normalizedText.includes(word))
    }

    const matchAllWordsInArray = (arr) => {
      if (!Array.isArray(arr) || arr.length === 0) return false
      return arr.some(item => matchAllWords(item))
    }

    const results = []

    videos.forEach(video => {
      if (matchAllWords(video.title)) {
        results.push({ video, category: 'Título' })
      } else if (matchAllWordsInArray(video.cast)) {
        results.push({ video, category: 'Actor' })
      } else if (video.language && matchAllWords(video.language)) {
        results.push({ video, category: 'Idioma' })
      } else if (matchAllWordsInArray(video.genres)) {
        results.push({ video, category: 'Género' })
      }
    })

    setFilteredSuggestions(results)
    setShowSuggestions(results.length > 0)
  }, [query, videos])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (video) => {
    setShowSuggestions(false)
    setQuery('')
    setTimeout(() => {
      navigate(`/pelicula/${video.id}`)
    }, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setShowSuggestions(false)
    navigate(`/search?query=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div className="search-bar__container" ref={suggestionsRef}>
      <form onSubmit={handleSubmit} autoComplete="off" className="search-bar">
        <input
          type="text"
          className="search-bar__input"
          placeholder="Buscar..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Buscar videos"
          onFocus={() => { if (filteredSuggestions.length) setShowSuggestions(true) }}
        />
        <button type="submit" className="search-bar__button">Buscar</button>
      </form>

      {showSuggestions && (
        <ul className="search-bar__suggestions" role="listbox">
          {filteredSuggestions.map(({ video, category }) => (
            <li
              key={video.id}
              className="search-bar__suggestion-item"
              onClick={() => handleSelect(video)}
              role="option"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') handleSelect(video) }}
            >
              <img
                src={video.thumbnail}
                alt={`Miniatura de ${video.title}`}
                className="search-bar__suggestion-thumbnail"
              />
              <div>
                <span className="search-bar__suggestion-title">{video.title}</span>
                <br />
                <small style={{ color: '#bbb' }}>Encontrado en: {category}</small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}