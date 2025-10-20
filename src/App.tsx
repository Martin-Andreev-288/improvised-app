import React, { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";
import { type Movie } from "./types.ts";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = `https://www.omdbapi.com?apikey=${API_KEY}`;

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchMovies = async (title: string) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search);
    }
  };

  useEffect(() => {
    searchMovies("Batman"); // Initial search
  }, []);

  return (
    <div className="app">
      <h1 className="title">MovieLand</h1>

      <div className="search-bar">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchMovies(searchTerm);
            }
          }}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="movies-container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div>
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
