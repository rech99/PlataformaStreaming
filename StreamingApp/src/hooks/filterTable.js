import { useState, useMemo, useEffect } from 'react'

export default function useFilteredSortedPagination(videos, videosPerPage = 10) {
  const [filterTitle, setFilterTitle] = useState('')
  const [sortOrder, setSortOrder] = useState('title-asc') // + 'year-asc', 'year-desc'
  const [currentPage, setCurrentPage] = useState(1)

  const getPrimaryGenre = (video) => {
    if (!video.genres || video.genres.length === 0) return ''
    return video.genres[0].toLowerCase()
  }

  const filteredVideos = useMemo(() => {
    let vids = videos

    if (filterTitle.trim() !== '') {
      const filterLower = filterTitle.toLowerCase()
      vids = vids.filter(v => v.title.toLowerCase().includes(filterLower))
    }

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
        case 'year-asc':
          return (a.year || 0) - (b.year || 0)  // Orden ascendente año, 0 si no hay año
        case 'year-desc':
          return (b.year || 0) - (a.year || 0)  // Orden descendente año
        default:
          return 0
      }
    })

    return vids
  }, [videos, filterTitle, sortOrder])

  const totalPages = useMemo(() => {
    return Math.ceil(filteredVideos.length / videosPerPage) || 1
  }, [filteredVideos.length, videosPerPage])

  const paginatedVideos = useMemo(() => {
    const startIndex = (currentPage - 1) * videosPerPage
    const endIndex = startIndex + videosPerPage
    return filteredVideos.slice(startIndex, endIndex)
  }, [filteredVideos, currentPage, videosPerPage])

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