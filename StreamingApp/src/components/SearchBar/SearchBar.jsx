import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchBar.css'

export default function SearchBar({ videos = [] }) {
  const [query, setQuery] = useState('')
  const [filteredVideos, setFilteredVideos] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionsRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!query.trim()) {
      setFilteredVideos([])
      setShowSuggestions(false)
      return
    }

    const filtered = videos.filter(video => {
      const title = video.title.toLowerCase()
      const words = query.toLowerCase().trim().split(/\s+/)
      let lastIndex = -1
      return words.every(word => {
        const index = title.indexOf(word, lastIndex + 1)
        if (index === -1) return false
        lastIndex = index
        return true
      })
    })

    setFilteredVideos(filtered)
    setShowSuggestions(filtered.length > 0)
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
    setQuery('')  // Limpiar el input para que no se vuelvan a mostrar sugerencias
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
          placeholder="Buscar videos..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Buscar videos"
          onFocus={() => { if (filteredVideos.length) setShowSuggestions(true) }}
        />
        <button type="submit" className="search-bar__button">Buscar</button>
      </form>
      {showSuggestions && (
        <ul className="search-bar__suggestions" role="listbox">
          {filteredVideos.map(video => (
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
              <span className="search-bar__suggestion-title">{video.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
