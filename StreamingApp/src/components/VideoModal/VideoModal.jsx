import React from 'react'
import './VideoModal.css'

export default function VideoModal({ video, onClose }) {
  const { title, url, year, synopsis } = video

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      role="dialog"
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg" onClick={e => e.stopPropagation()}>
        <div className="modal-content bg-dark text-white">
          <div className="modal-header border-0">
            <h5 className="modal-title">{title} ({year})</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>{synopsis}</p>
            {url.includes('youtube.com') ? (
              <iframe
                className="w-100"
                height="400"
                src={`https://www.youtube.com/embed/${url.split('v=')[1]}`}
                title={title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <video className="w-100" height="400" controls>
                <source src={url} />
                Tu navegador no soporta video.
              </video>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}