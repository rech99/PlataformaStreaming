import { useState, useEffect } from 'react'

function useVideos() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setVideos([
          {
            id: '1',
            title: 'Clair Obscur',
            director: 'Jane Doe',
            year: 2023,
            duration: '1h 45min',
            reviews: [
              "Hermosa cinematografía",
              "Una obra maestra de la luz y sombra",
            ],
            synopsis: 'Una hermosa película de claroscuros.',
            thumbnail: 'https://img.youtube.com/vi/K8Tikj_0Cqw/0.jpg',
            url: 'https://www.youtube.com/watch?v=K8Tikj_0Cqw',
          },
          {
            id: '2',
            title: 'Terminator 2: Judgment Day',
            director: 'James Cameron',
            year: 1998,
            duration: '2h 17min',
            reviews: [
              "Secuela épica de ciencia ficción",
              "Una de las mejores películas de acción de todos los tiempos",
            ],
            synopsis: 'Una secuela épica de ciencia ficción.',
            thumbnail: 'https://img.youtube.com/vi/nGrW-OR2uDk/0.jpg',
            url: 'https://www.youtube.com/watch?v=nGrW-OR2uDk',
          },
          {
            id: '3',
            title: 'Inception',
            director: 'Christopher Nolan',
            year: 2010,
            duration: '2h 28min',
            reviews: [
              "Una película que desafía la mente",
              "Un viaje alucinante a través de los sueños",
            ],
            synopsis: 'Un thriller psicológico que juega con la realidad.',
            thumbnail: 'https://filmartgallery.com/cdn/shop/files/Inception-Vintage-Movie-Poster-Original.jpg?height=1024&v=1738912645&width=1024',
            url: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
          },
          {
            id: '4',
            title: 'The Matrix',
            director: 'Lana Wachowski, Lilly Wachowski',
            year: 1999,
            duration: '2h 16min',
            reviews: [
              "Un clásico de la ciencia ficción",
              "Una película que redefine el género",
            ],
            synopsis: 'Un hacker descubre la verdad sobre su realidad.',
            thumbnail: 'https://filmartgallery.com/cdn/shop/products/The-Matrix-Vintage-Movie-Poster-Original.jpg?v=1738903563',
            url: 'https://www.youtube.com/watch?v=vKQi3bpH7Wo',
          },
          {
            id: '5',
            title: 'Interstellar',
            director: 'Christopher Nolan',
            year: 2014,
            duration: '2h 49min',
            reviews: [
              "Una obra maestra visual y emocional",
              "Un viaje épico a través del espacio y el tiempo",
            ],
            synopsis: 'Un grupo de exploradores viaja a través de un agujero de gusano.',
            thumbnail: 'https://film-grab.com/wp-content/uploads/2015/04/35-512.jpg',
            url: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
          },
          {
            id: '6',
            title: 'The Shawshank Redemption',
            director: 'Frank Darabont',
            year: 1994,
            duration: '2h 22min',
            reviews: [
              "Una historia de esperanza y amistad",
              "Una película que toca el corazón",
            ],
            synopsis: 'La historia de un hombre encarcelado injustamente.',
            thumbnail: 'https://img.youtube.com/vi/6hB3S9bIaco/0.jpg',
            url: 'https://www.youtube.com/watch?v=6hB3S9bIaco',
          },
          {
            id: '7',
            title: 'The Godfather',
            director: 'Francis Ford Coppola',
            year: 1972,
            duration: '2h 55min',
            reviews: [
              "Un clásico del cine",
              "Una obra maestra de la mafia",
            ],
            synopsis: 'La historia de una familia mafiosa en Nueva York.',
            thumbnail: 'https://img.youtube.com/vi/sY1S34973zA/0.jpg',
            url: 'https://www.youtube.com/watch?v=sY1S34973zA',
          },
          {
            id: '8',
            title: 'Pulp Fiction',
            director: 'Quentin Tarantino',
            year: 1994,
            duration: '2h 34min',
            reviews: [
              "Una película innovadora y entretenida",
              "Un clásico de culto",
            ],
            synopsis: 'Una serie de historias entrelazadas en Los Ángeles.',
            thumbnail: 'https://img.youtube.com/vi/s7EdQ4FqbhY/0.jpg',
            url: 'https://www.youtube.com/watch?v=s7EdQ4FqbhY',
          },
          {
            id: '9',
            title: 'The Dark Knight',
            director: 'Christopher Nolan',
            year: 2008,
            duration: '2h 32min',
            reviews: [
              "Una de las mejores películas de superhéroes",
              "Una actuación inolvidable de Heath Ledger",
            ],
            synopsis: 'Batman enfrenta al Joker en Gotham City.',
            thumbnail: 'https://img.youtube.com/vi/EXeTwQWrcwY/0.jpg',
            url: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
          },
          {
            id: '10',
            title: 'Forrest Gump',
            director: 'Robert Zemeckis',
            year: 1994,
            duration: '2h 22min',
            reviews: [
              "Una historia conmovedora y divertida",
              "Una película que deja huella",
            ],
            synopsis: 'La vida extraordinaria de un hombre común.',
            thumbnail: 'https://img.youtube.com/vi/bLvqoHBptjg/0.jpg',
            url: 'https://www.youtube.com/watch?v=bLvqoHBptjg',
          },
          {
            id: '11',
            title: 'Gladiator',
            director: 'Ridley Scott',
            year: 2000,
            duration: '2h 35min',
            reviews: [
              "Una épica historia de venganza",
              "Una película visualmente impresionante",
            ],
            synopsis: 'Un general romano se convierte en gladiador.',
            thumbnail: 'https://img.youtube.com/vi/owK1qxDselE/0.jpg',
            url: 'https://www.youtube.com/watch?v=owK1qxDselE',
          },
          {
            id: '12',
            title: 'The Silence of the Lambs',
            director: 'Jonathan Demme',
            year: 1991,
            duration: '1h 58min',
            reviews: [
              "Un thriller psicológico inquietante",
              "Una actuación magistral de Anthony Hopkins",
            ],
            synopsis: 'Una joven agente del FBI busca la ayuda de un asesino encarcelado.',
            thumbnail: 'https://img.youtube.com/vi/ZWxL3g8d9aY/0.jpg',
            url: 'https://www.youtube.com/watch?v=ZWxL3g8d9aY',
          },
          {
            id: '13',
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            director: 'Peter Jackson',
            year: 2001,
            duration: '2h 58min',
            reviews: [
              "Una adaptación épica de la obra maestra de Tolkien",
              "Un viaje inolvidable a la Tierra Media",
            ],
            synopsis: 'Un grupo de héroes se embarca en una misión para destruir un anillo poderoso.',
            thumbnail: 'https://img.youtube.com/vi/8bYB9d3k6a4/0.jpg',
            url: 'https://www.youtube.com/watch?v=8bYB9d3k6a4',
          },
          {
            id: '14',
            title: 'Fight Club',
            director: 'David Fincher',
            year: 1999,
            duration: '2h 19min',
            reviews: [
              "Una película provocadora y controvertida",
              "Una crítica a la sociedad de consumo",
            ],
            synopsis: 'Un hombre insatisfecho con su vida forma un club de lucha clandestino.',
            thumbnail: 'https://img.youtube.com/vi/qtRKdVHc-cE/0.jpg',
            url: 'https://www.youtube.com/watch?v=qtRKdVHc-cE',
          },
          {
            id: '15',
            title: 'The Social Network',
            director: 'David Fincher',
            year: 2010,
            duration: '2h 00min',
            reviews: [
              "Una mirada fascinante a la creación de Facebook",
              "Una historia de ambición y traición",
            ],
            synopsis: 'La historia de la creación de Facebook y sus controversias.',
            thumbnail: 'https://img.youtube.com/vi/lB95KLmpLR4/0.jpg',
            url: 'https://www.youtube.com/watch?v=lB95KLmpLR4',
          },
          {
            id: '16',
            title: 'The Grand Budapest Hotel',
            director: 'Wes Anderson',
            year: 2014,
            duration: '1h 39min',
            reviews: [
              "Una comedia visualmente deslumbrante",
              "Una historia encantadora y divertida",
            ],
            synopsis: 'Las aventuras de un conserje de hotel y su aprendiz.',
            thumbnail: 'https://img.youtube.com/vi/1Fg5iWmQjwk/0.jpg',
            url: 'https://www.youtube.com/watch?v=1Fg5iWmQjwk',
          },
          {
            id: '17',
            title: 'Parasite',
            director: 'Bong Joon-ho',
            year: 2019,
            duration: '2h 12min',
            reviews: [
              "Una crítica social brillante y entretenida",
              "Una película que desafía las expectativas",
            ],
            synopsis: 'La historia de dos familias de clases sociales opuestas.',
            thumbnail: 'https://img.youtube.com/vi/5xHj8y5k3c4/0.jpg',
            url: 'https://www.youtube.com/watch?v=5xHj8y5k3c4',
          },
          {
            id: '18',
            title: 'Spirited Away',
            director: 'Hayao Miyazaki',
            year: 2001,
            duration: '2h 5min',
            reviews: [
              "Una obra maestra de la animación japonesa",
              "Una historia mágica y conmovedora",
            ],
            synopsis: 'Una niña se pierde en un mundo espiritual y debe encontrar su camino a casa.',
            thumbnail: 'https://img.youtube.com/vi/ByXuk9QqQkk/0.jpg',
            url: 'https://www.youtube.com/watch?v=ByXuk9QqQkk',
          },
          {
            id: '19',
            title: 'The Lion King',
            director: 'Roger Allers, Rob Minkoff',
            year: 1994,
            duration: '1h 28min',
            reviews: [
              "Un clásico de Disney que toca el corazón",
              "Una historia de crecimiento y redención",
            ],
            synopsis: 'La historia de un joven león que debe reclamar su lugar como rey.',
            thumbnail: 'https://img.youtube.com/vi/4sj1MT05lAA/0.jpg',
            url: 'https://www.youtube.com/watch?v=4sj1MT05lAA',
          },
          {
            id: '20',
            title: 'Back to the Future',
            director: 'Robert Zemeckis',
            year: 1985,
            duration: '1h 56min',
            reviews: [
              "Una aventura atemporal llena de diversión",
              "Un clásico de la ciencia ficción",
            ],
            synopsis: 'Un adolescente viaja al pasado y debe asegurarse de que sus padres se conozcan.',
            thumbnail: 'https://img.youtube.com/vi/qvsgGtivCgs/0.jpg',
            url: 'https://www.youtube.com/watch?v=qvsgGtivCgs',
          },
            {
            id: '21',
            title: 'The Avengers',
            director: 'Joss Whedon',  
            year: 2012,
            duration: '2h 23min',
            reviews: [
              "Un crossover épico de superhéroes",
              "Una película llena de acción y humor",
            ],
            synopsis: 'Un grupo de superhéroes se une para salvar el mundo.',
            thumbnail: 'https://img.youtube.com/vi/eOrNdBpGMv8/0.jpg',
            url: 'https://www.youtube.com/watch?v=eOrNdBpGMv8',
            }
        ])
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return { videos, loading, error }
}

export default useVideos