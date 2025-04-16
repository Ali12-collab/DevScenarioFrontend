// ✅ src/Components/SearchBar.js
import React, { useState, useEffect } from 'react';
import '../Styling/SearchBar.css';

const SearchBar = ({ placeholder = 'Search...', data = [], onSelect }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (input.trim() === '') {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const filtered = data.filter(item =>
      item.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filtered);
    setShowDropdown(true);
  }, [input, data]);

  const handleSelect = (value) => {
    setInput(value);
    setSuggestions([]);
    setShowDropdown(false);
    if (onSelect) onSelect(value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => input && setShowDropdown(true)}
      />
      {showDropdown && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSelect(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;