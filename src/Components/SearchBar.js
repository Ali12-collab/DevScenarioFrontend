import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import '../Styling/SearchBar.css';

const SearchBar = ({ data = [], searchFields = [], onSearch, placeholder = 'Search...' }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Build filtered suggestions based on dynamic fields
  useEffect(() => {
    if (!inputValue) {
      setSuggestions([]);
      return;
    }

    const lowerInput = inputValue.toLowerCase();

    const matchedItems = data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        return value && value.toLowerCase().includes(lowerInput);
      })
    );

    // Remove duplicates and map to react-select format
    const uniqueLabels = [...new Set(
      matchedItems.map((item) => {
        for (const field of searchFields) {
          if (item[field]?.toLowerCase().includes(lowerInput)) {
            return item[field];
          }
        }
        return null;
      }).filter(Boolean)
    )];

    setSuggestions(uniqueLabels.map((label) => ({ label, value: label })));
  }, [inputValue, data, searchFields]);

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleSelectChange = (selected) => {
    const value = selected ? selected.label : '';
    setInputValue(value);
    onSearch(value);
  };

  return (
    <div className="search-bar-container">
      <Select
        value={inputValue ? { label: inputValue, value: inputValue } : null}
        onChange={handleSelectChange}
        onInputChange={handleInputChange}
        options={suggestions}
        isClearable
        placeholder={placeholder}
        noOptionsMessage={() => 'No matching results'}
      />
    </div>
  );
};

export default SearchBar;
