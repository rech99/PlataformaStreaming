import React from 'react'
import './VideoPlayer.css'

export default function VideoPlayer({ video }) {
  if (!video) {
    return <p className="video-player__no-video">Selecciona un video para reproducir</p>
  }

  return (
    <div className="video-player">
      <h2 className="video-player__title">{video.title}</h2>
      <video
        className="video-player__video"
        controls
        src={video.url}
        preload="metadata"
      >
        Tu navegador no soporta el elemento de video.
      </video>
    </div>
  )
}