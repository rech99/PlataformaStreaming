// src/pages/Home.jsx
import React, { useState } from 'react'
import VideoList from '../components/VideoList/VideoList'
import LoadingIcon from '../components/LoadingIcon/LoadingIcon'
import VideoModal from '../components/VideoModal/VideoModal'



export default function Home({ allVideos = [], loading = true, error = null }) {
  const [modalVideo, setModalVideo] = useState(null)

  const openModal = (video) => {
    setModalVideo(video)
  }

  const closeModal = () => {
    setModalVideo(null)
  }


  if (error) {
    return <div>Error al cargar videos en Home: {error.message}</div>;
  }

  return (
    <main>
      <h1>Catalogo</h1>

      {loading ? (
        <div className="loading-container">
          <LoadingIcon />
        </div>
      ) : (

        <VideoList videos={allVideos} openModal={openModal} /> 
      )}
      {modalVideo && <VideoModal video={modalVideo} onClose={closeModal} />}
    </main>
  )
}