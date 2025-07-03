import React, { useState } from 'react'
import useVideos from '../hooks/useVideos'
import VideoModal from '../components/VideoModal/VideoModal'
import VideoList from '../components/VideoList/VideoList'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './home.css'
import LoadingIcon from '../components/LoadingIcon/LoadingIcon'

function groupVideosByGenre(videos) {
  const grouped = {}
  videos.forEach(video => {
    video.genres.forEach(genre => {
      if (!grouped[genre]) grouped[genre] = []
      grouped[genre].push(video)
    })
  })
  return grouped
}

function CarouselPorGenero({ videos, openModal }) {
  let displayVideos = [...videos];

  // Si hay menos de 3 videos, repetimos indefinidamente
  while (displayVideos.length < 3) {
    displayVideos = displayVideos.concat(videos);
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ]
  };

  return (
    <Slider {...settings}>
      {displayVideos.map((video, i) => (
        <div
          key={`${video.id}-${i}`} // key único para cada repetición
          onClick={() => openModal(video)}
          style={{ padding: '0 10px', boxSizing: 'border-box' }}
        >
          <VideoList videos={[video]} openModal={openModal} />
        </div>
      ))}
    </Slider>
  );
}


export default function Home() {
  const { videos, loading, error } = useVideos()
  const [modalVideo, setModalVideo] = useState(null)

  const openModal = (video) => setModalVideo(video)
  const closeModal = () => setModalVideo(null)

  if (loading) return <div className="loading-container"><LoadingIcon /></div>;
  if (error) return <div>Error: {error.message}</div>

  const grouped = groupVideosByGenre(videos)

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Inicio</h1>
      {Object.entries(grouped).map(([genre, vids]) => (
        <section key={genre}>
          <h2>{genre}</h2>
          <CarouselPorGenero videos={vids} openModal={openModal} />
        </section>
      ))}
      {modalVideo && <VideoModal video={modalVideo} onClose={closeModal} />}
    </main>
  )
}
