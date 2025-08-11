import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState(''); // NEW: movie type filter
  const [year, setYear] = useState(''); // NEW: year filter

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, 1, type, year); // Pass filters to parent search function
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      < select value={type} onChange={(e) => setType(e.target.value)} className="options">
        <option value="">All</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="episode">Episodes</option>
      </select>
      
      <input
        type="number"
        placeholder="Year"
        value={year}

        onChange={(e) => setYear(e.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
