import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css"; // Import the Home-specific CSS

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">
        hi this is the home page wanna surf for movies ?
      </h1>
      <Link to="/movies">
        <button className="home-button">Click here</button>
      </Link>
    </div>
  );
};

export default Home;
