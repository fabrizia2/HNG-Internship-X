import React from 'react';

function MovieSearch({
  searchQuery,
  setSearchQuery,
  handleSearch,
  loading,
  searchResults,
  handleSelectMovie,
}) {
  return (
    <div className="movie-search">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {loading && <p>Loading...</p>}

      <div className="search-results">
        {searchResults.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
            <p>Release Date: {movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
