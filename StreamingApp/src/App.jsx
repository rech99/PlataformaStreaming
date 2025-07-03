// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/layout';
import useVideos from './hooks/useVideos'; 
import Home from './pages/home';
import List from './pages/list';
import VideoDetail from './pages/video_detail';
import SearchResults from './pages/search';
import LoadingIcon from './components/LoadingIcon/LoadingIcon';

export default function App() {
  const { videos, loading, error } = useVideos();
  console.log('App.jsx - Estado de videos:', { videos, loading, error });


  if (loading) {
    return <div className="loading-container"><LoadingIcon /></div>;
  }

  if (error) {
    return <div>Error al cargar videos: {error.message}</div>;
  }

  return (
    <Router>
      <Routes>

        <Route element={<Layout allVideos={videos} loading={loading} error={error} />}>

          <Route path="/" element={<Home allVideos={videos} loading={loading} error={error} />} />
          <Route path="/lista" element={<List allVideos={videos} loading={loading} error={error} />} />
          <Route path="/pelicula/:id" element={<VideoDetail allVideos={videos} loading={loading} error={error} />} />
          <Route path="/search" element={<SearchResults allVideos={videos} loading={loading} error={error} />} />
        </Route>

        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
    </Router>
  );
}