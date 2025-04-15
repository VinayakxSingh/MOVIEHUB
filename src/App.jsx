import { Link, Route, Routes } from "react-router-dom";
import "./App.css"; // Import the global App CSS
import Movies from "./components/movies";
import Home from "./components/home";
import Watchlist from "./components/watchlist";

function App() {
  return (
    <div>
      <nav id="navbar">
        <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/watchlist">Watchlist</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </div>
  );
}

export default App;
