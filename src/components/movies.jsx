import { useEffect, useState } from "react";
import axios from "axios";
import { useWatchlist } from "../context/watchlistcontext";
import "../styles/movies.css"; // Import the Movies-specific CSS

const Movies = () => {
  const [query, setQuery] = useState("marvel");
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const { addToWatchlist, watchlist } = useWatchlist();

  const fetchMovies = async (term, pageNum) => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?s=${term}&apikey=a693dde2&page=${pageNum}`
      );
      if (res.data.Response === "True") {
        setMovies(res.data.Search);
        setTotalResults(parseInt(res.data.totalResults));
      } else {
        setMovies([]);
        setTotalResults(0);
      }
    } catch (err) {
      console.error("API error:", err);
    }
  };

  useEffect(() => {
    fetchMovies(query, page);
  }, [query, page]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setQuery(searchTerm.trim());
      setPage(1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const totalPages = Math.ceil(totalResults / 10);

  const isInWatchlist = (id) => watchlist.some((movie) => movie.imdbID === id);

  return (
    <div className="movies-container">
      <h2
        style={{
          textAlign: "center",
          marginTop: "20px",
          position: "relative",
          bottom: "20px",
        }}
      >
        Search Movies
      </h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              {movie.Poster && movie.Poster !== "N/A" ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="movie-poster"
                />
              ) : (
                <div className="no-poster">No Poster</div>
              )}
              <div className="movie-info">
                <h4 className="movie-title">{movie.Title}</h4>
                <p className="movie-year">{movie.Year}</p>
                <button
                  onClick={() => addToWatchlist(movie)}
                  disabled={isInWatchlist(movie.imdbID)}
                  className="watchlist-button"
                >
                  {isInWatchlist(movie.imdbID)
                    ? "Added to Watchlist"
                    : "Add to Watchlist"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No movies found for "{query}"</p>
        )}
      </div>

      {movies.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="page-number">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Movies;
