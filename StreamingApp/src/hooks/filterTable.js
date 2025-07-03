import { useState, useMemo, useEffect } from 'react'


export default function useFilteredSortedPagination(videos, videosPerPage = 10) {
  // Estado para el filtro del título (input texto)
  const [filterTitle, setFilterTitle] = useState('')
  // Estado para el tipo de ordenamiento seleccionado
  const [sortOrder, setSortOrder] = useState('title-asc') // opciones: title-asc, title-desc, genre-asc, genre-desc
  // Estado para la página actual de paginación
  const [currentPage, setCurrentPage] = useState(1)

  // Función auxiliar para obtener el primer género de un video en minúsculas (o cadena vacía)
  const getPrimaryGenre = (video) => {
    if (!video.genres || video.genres.length === 0) return ''
    return video.genres[0].toLowerCase()
  }

  // Lista filtrada y ordenada, memoizada para no recalcular en cada render innecesariamente
  const filteredVideos = useMemo(() => {
    let vids = videos

    // FILTRADO por título (sin importar mayúsculas/minúsculas)
    if (filterTitle.trim() !== '') {
      const filterLower = filterTitle.toLowerCase()
      vids = vids.filter(v => v.title.toLowerCase().includes(filterLower))
    }

    // ORDENAR según la opción seleccionada
    vids = vids.slice().sort((a, b) => {
      switch (sortOrder) {
        case 'title-asc':
          return a.title.localeCompare(b.title)
        case 'title-desc':
          return b.title.localeCompare(a.title)
        case 'genre-asc':
          return getPrimaryGenre(a).localeCompare(getPrimaryGenre(b))
        case 'genre-desc':
          return getPrimaryGenre(b).localeCompare(getPrimaryGenre(a))
        default:
          return 0
      }
    })

    return vids
  }, [videos, filterTitle, sortOrder])

  // Número total de páginas según el total filtrado y cantidad por página
  const totalPages = useMemo(() => {
    return Math.ceil(filteredVideos.length / videosPerPage) || 1
  }, [filteredVideos.length, videosPerPage])

  // Lista paginada, solo los videos visibles en la página actual
  const paginatedVideos = useMemo(() => {
    const startIndex = (currentPage - 1) * videosPerPage
    const endIndex = startIndex + videosPerPage
    return filteredVideos.slice(startIndex, endIndex)
  }, [filteredVideos, currentPage, videosPerPage])

  // Si cambia filtro u orden, reiniciamos la página a la 1 para evitar página vacía
  useEffect(() => {
    setCurrentPage(1)
  }, [filterTitle, sortOrder])

  return {
    filteredVideos,    
    paginatedVideos,   
    currentPage,
    setCurrentPage,
    totalPages,
    filterTitle,
    setFilterTitle,
    sortOrder,
    setSortOrder,
  }
}