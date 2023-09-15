import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = 'https://api.themoviedb.org/3/movie/top_rated';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <p>Release Date: {movie.release_date}</p>
      <p>Runtime: {movie.runtime} minutes</p>
      <p>{movie.overview}</p>
    </div>
  );
}

export default MovieDetails;
