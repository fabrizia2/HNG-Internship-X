import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeartIcon from './fav';
import axios from 'axios';


function Card({ movie }) {
  console.log('Movie data:', movie);
  const [isFavorite, setIsFavorite] = useState(false);
  const [genres, setGenres] = useState([]);

  const toggleFavorite = (e) => {
    e.preventDefault(); // Prevent the default link behavior
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/genre/movie/list',
          {
            params: {
              api_key: '9724ee7735f6229f16425966d22d4ff6',
            },
          }
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    }

    fetchGenres();
  }, []);

  // Function to get genre names based on genre IDs
  const getGenreNames = () => {
    return movie.genre_ids.map((genreId) => {
      const genre = genres.find((genre) => genre.id === genreId);
      return genre ? genre.name : '';
    });
  };

  return (
    <div className="movie-card">
      <Link to={`/movies/${movie.id}`}>
        {/* Container for the image and HeartIcon */}
        <div className="image-container">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            data-testid="movie-poster"
          />
          {/* Position the HeartIcon in the top right corner */}
          <div className={`favorite-icon ${isFavorite ? 'favorite' : ''}`} onClick={toggleFavorite}>
            <HeartIcon />
          </div>
        </div>
        <h2 data-testid="movie-title">{movie.title}</h2>
        <p data-testid="movie-release-date">{movie.release_date}</p>
        <p className="movie-genres">{getGenreNames().join(', ')}</p>
      </Link>
    </div>
  );
}

export default Card;

