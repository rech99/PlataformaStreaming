// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layout/layout'

import Home from './pages/home'
import List from './pages/list'
import VideoDetail from './pages/video_detail'

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas que usan el layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/lista" element={<List />} />
          <Route path="/pelicula/:id" element={<VideoDetail />} />
        </Route>

        {/* Rutas sin layout */}

        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
    </Router>
  )
}