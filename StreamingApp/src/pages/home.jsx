import React, { useState } from 'react'
import VideoList from '../components/VideoList/VideoList'
import LoadingIcon from '../components/LoadingIcon/LoadingIcon'
import VideoModal from '../components/VideoModal/VideoModal'
import useVideos from '../hooks/useVideos'


export default function Home() {
  const { videos, loading } = useVideos()
  const [modalVideo, setModalVideo] = useState(null)

  const openModal = (video) => {
    setModalVideo(video)
  }

  const closeModal = () => {
    setModalVideo(null)
  }

  return (

      <main>
        <h1>Catalogo</h1>
        {loading ? (
          <div className="loading-container">
            <LoadingIcon />
          </div>
        ) : (
          <VideoList videos={videos} openModal={openModal} />
        )}
        {modalVideo && <VideoModal video={modalVideo} onClose={closeModal} />}
      </main>

  )
}