// src/pages/List.jsx
import React from 'react'
import VideoTable from '../components/VideoTable/VideoTable'

export default function List({ allVideos = [], loading = true, error = null }) {
  console.log('List.jsx - Props recibidas:', { allVideos, loading, error });

  return (
    <div>
      <h1>Lista de Peliculas</h1>
      <VideoTable videos={allVideos} loading={loading} error={error} />
    </div>
  )
}