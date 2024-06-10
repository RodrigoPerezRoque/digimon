


import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <input
      type="text"
      className="form-control"
      placeholder="Buscar Digimon..."
      value={query}
      onChange={handleInputChange}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      }}
    />
  );
};

export default SearchBar;
