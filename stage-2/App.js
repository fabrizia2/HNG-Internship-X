import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

const API_KEY = 'YOUR_API_KEY';

function App() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    fetchTopRatedMovies();
  }, []);

  const fetchTopRatedMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
      const data = await response.json();
      setTopRatedMovies(data.results);
    } catch (error) {
      console.error('Error fetching top-rated movies:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Movie Discovery</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
            </ul>
          </nav>
        </header>

        <Route exact path="/" render={() => (
          <div className="movie-list">
            {topRatedMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )} />
      </div>
    </Router>
  );
}

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <Link to={`/movies/${movie.id}`}>
        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
        <h3>{movie.title}</h3>
        <p>Release Date: {movie.release_date}</p>
      </Link>
    </div>
  );
}

export default App;
