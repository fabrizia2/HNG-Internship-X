import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './card'; // Import the Card component


function HomePage() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); // Track the selected movie for the hero section

  useEffect(() => {
    async function fetchTopRatedMovies() {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
          {
            params: {
              api_key: '9724ee7735f6229f16425966d22d4ff6',
            },
          }
        );
        setTopRatedMovies(response.data.results.slice(0, 10));
      } catch (error) {
        console.error('Error fetching top-rated movies:', error);
      }
    }

    fetchTopRatedMovies();
  }, []);

  useEffect(() => {
    async function fetchRandomMovie() {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/popular',
          {
            params: {
              api_key: '9724ee7735f6229f16425966d22d4ff6',
            },
          }
        );
        setSelectedMovie(response.data.results[Math.floor(Math.random() * response.data.results.length)]);
      } catch (error) {
        console.error('Error fetching random movie:', error);
      }
    }

    fetchRandomMovie();
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      // Don't perform an empty search
      return;
    }
  
    setLoading(true);
  
    try {
      const requestUrl = 'https://api.themoviedb.org/3/search/movie';
      const response = await axios.get(requestUrl, {
        params: {
          api_key: '9724ee7735f6229f16425966d22d4ff6',
          query: searchQuery,
        },
      });
  
      // Log search results and request URL
      console.log('API request URL:', requestUrl);
      console.log('Search results:', response.data.results);
  
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  
    setLoading(false);
  };

  // Handle search when "Enter" key is pressed
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle search when the search icon is clicked
  const handleIconClick = () => {
    handleSearch();
  };
  

  // Handle selecting a movie for the hero section
  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="homepage-container">
      {/* Hero section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: selectedMovie
            ? `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`
            : '',
        }}
      >
        {/* Navbar */}
        <div className="navbar">
          <div className="logo"><h2>Movie Box</h2></div>
          
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress} // Handle "Enter" key press
              className="search-input"
            />
            <div
              className="search-icon"
              onClick={handleIconClick} // Handle icon click
            >
              {/* Include your search icon here */}
              
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z"
               stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

            </div>
          </div>
          <div className="sign-in"><h2>Sign in</h2><img src="/signIn.svg" alt="Sign In" /></div>
        </div>
        
        <div className="hero-content">
          {selectedMovie ? (
            <div className='left'>
              <h1>{selectedMovie.title}</h1>
              <p>{selectedMovie.overview}</p>
              <button>
                <a
                  href={`https://www.youtube.com/watch?v=${selectedMovie.trailer_key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trailer-button"
                >
                  WATCH TRAILER
                </a>
              </button>
            </div>
          ) : (
            <>
            </>
          )}
        </div>
      </div>
  
      {loading && <p>Loading...</p>}
  
      <div className="search-results">
        {searchResults.map((movie) => (
          <Card
            key={movie.id}
            movie={movie}
            onSelectMovie={handleSelectMovie} // Pass the onSelectMovie function
          />
        ))}
      </div>
  
      <h1>Featured Movie</h1>
      <div className="movie-grid">
        {topRatedMovies.map((movie) => (
          <Card
            key={movie.id}
            movie={movie}
            onSelectMovie={handleSelectMovie} // Pass the onSelectMovie function
          />
        ))}
      </div>

      <footer className="footer">
        <div className="social-icons">
          <a href="https://twitter.com/fabrizia_renish" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com/in/renish-okago-993498246/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/fabrizia2" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </div>
        <p>&copy; 2023 MovieBox by Melvin Renish. All rights reserved.</p>
      </footer>

    </div>
  );
  
}

export default HomePage;
