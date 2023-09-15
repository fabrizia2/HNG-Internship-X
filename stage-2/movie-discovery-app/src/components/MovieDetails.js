import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../movieDetails.css'; // Import the CSS file
import { Link, useLocation } from 'react-router-dom';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: '9724ee7735f6229f16425966d22d4ff6',
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }

    fetchMovieDetails();
  }, [id]);

  return (
    <div className="movie-details-container">
      <div className="nabar">
        <div className="logo"><h2>Movie Box</h2></div>
        <Link to="/">
          <i className="fas fa-home"></i> Home
        </Link>
        <Link to="/movies/:id" className={location.pathname.includes('/movies/') ? 'active-link' : ''}>
          <i className="fas fa-film"></i> Movies
        </Link>
        <Link to="/tv-series">
          <i className="fas fa-tv"></i> TV Series
        </Link>
        <Link to="/upcoming">
          <i className="fas fa-calendar"></i> Upcoming
        </Link>
      </div>
      
      <div className='content'>
        {movie ? (
          <div>
            <div
              className="her-section"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
              }}
            >
              {/* Watch trailer button */}
              <a
                href={`https://www.youtube.com/watch?v=${movie.trailer_key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-trailer-button"
                
              >
                <i className="fas fa-play fa-2x play"></i>
                Watch Trailer
              </a>
            </div>

            <h1 className="movie-title" data-testid="movie-title">{movie.title}</h1>
            <p className="movie-release-date" data-testid="movie-release-date">{movie.release_date}</p>
            <p className="movie-runtime" data-testid="movie-runtime">{movie.runtime} minutes</p>
            <p className="movie-overview" data-testid="movie-overview">{movie.overview}</p>

          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
