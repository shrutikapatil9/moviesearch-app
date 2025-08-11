import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // 🔍 Search movies by title
 const searchMovies = async (title, newPage = 1, type = '', year = '') => {
  try {
    if (newPage === 1) setMovies([]);
    const res = await axios.get(
      `https://www.omdbapi.com/?apikey=121a9252&s=${title}&type=${type}&y=${year}&page=${newPage}`
    );
    setMovies((prev) => [...prev, ...(res.data.Search || [])]);
    setPage(newPage);
    setLastQuery(title);
  } catch (err) {
    console.error(err);
  }
};

  // 🎬 Get movie details by IMDb ID
  const getMovieDetails = async (id) => {
    try {
      const res = await axios.get(`https://www.omdbapi.com/?apikey=121a9252&i=${id}&plot=full`);
      setSelectedMovie(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const [watchlist, setWatchlist] = useState(() => {
  const saved = localStorage.getItem('watchlist');
  return saved ? JSON.parse(saved) : [];
});

const toggleWatchlist = (movie) => {
  const exists = watchlist.some((m) => m.imdbID === movie.imdbID);
  let updated;
  if (exists) {
    updated = watchlist.filter((m) => m.imdbID !== movie.imdbID);
  } else {
    updated = [...watchlist, movie];
  }
  setWatchlist(updated);
  localStorage.setItem('watchlist', JSON.stringify(updated));
};
const [page, setPage] = useState(1);
const [lastQuery, setLastQuery] = useState('');



  return (
    <div className="App">
      <h1>Search for Movies!</h1>
      <SearchBar onSearch={searchMovies} />
      <MovieList movies={movies} onMovieClick={getMovieDetails} />
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}

export default App;
