import React from 'react'
import './Card.css'

export default function Card({ video, openModal }) {
  const { title, thumbnail } = video

  const handleClick = () => {
    openModal(video)
  }

  return (
    <article
      className="video-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter') handleClick() }}
    >
      <img
        src={thumbnail}
        alt={`Miniatura del video: ${title}`}
        className="video-card__thumbnail"
      />
      <div className="video-card__overlay">
        <h2 className="video-card__title">{title}</h2>
      </div>
    </article>
  )
}