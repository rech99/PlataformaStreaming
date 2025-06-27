// src/layout/layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

// Recibe las props del App.jsx
export default function Layout({ allVideos, loading, error }) {
  console.log('Layout.jsx - Props recibidas:', { allVideos, loading, error });
  return (
    <>
      <Navbar allVideos={allVideos} loading={loading} error={error} /> 
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}