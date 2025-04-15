import React from "react";
import { useWatchlist } from "../context/watchlistcontext";
import "../styles/watch.css"; // Import the Watchlist-specific CSS

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="watchlist-container">
      <h2 className="watchlist-title" style={{ textAlign: "center" }}>
        Your Watchlist
      </h2>

      {watchlist.length === 0 ? (
        <p className="empty-watchlist">No movies in your watchlist.</p>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map((movie) => (
            <div key={movie.imdbID} className="watchlist-item">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : ""}
                alt={movie.Title}
                className="watchlist-poster"
              />
              <h4>{movie.Title}</h4>
              <p>{movie.Year}</p>
              <button
                onClick={() => removeFromWatchlist(movie.imdbID)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
