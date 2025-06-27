import React from 'react'
import Card from '../Card/card'
import './VideoList.css'

export default function VideoList({ videos, openModal }) {
  return (
    <div className="video-list">
      {videos.map(video => (
        <Card
          key={video.id}
          video={video}
          openModal={openModal}
        />
      ))}
    </div>
  )
}