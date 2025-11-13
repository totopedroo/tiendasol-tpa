/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import { SearchIcon } from "../icons/Search";

const SearchBar = ({
  onSearch,
  placeholder = "Buscar productos...",
  className = "",
  variant = "default",
  value: externalValue,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState("");

  // Usar valor externo si está disponible, sino usar el interno
  const isControlled = externalValue !== undefined;
  const searchText = isControlled ? externalValue : internalValue;

  // Sincronizar el valor interno con el externo cuando cambia
  useEffect(() => {
    if (isControlled) {
      setInternalValue(externalValue);
    }
  }, [externalValue, isControlled]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (onSearch) {
      onSearch(searchText);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;

    if (isControlled && onChange) {
      // Si es controlado, notificar al padre
      onChange(newValue);
    } else {
      // Si no es controlado, manejar internamente
      setInternalValue(newValue);
    }
  };

  if (variant === "inline") {
    return (
      <div className={`search-bar ${className}`}>
        <input
          className="search-input"
          placeholder={placeholder}
          value={searchText}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch}>
          <SearchIcon className="search-icon" />
        </button>
      </div>
    );
  }

  return (
    <div className={`search-input-wrapper ${className}`}>
      <input
        className="search-input"
        placeholder={placeholder}
        value={searchText}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleSearch}>
        <SearchIcon className="search-icon" />
      </button>
    </div>
  );
};

export default SearchBar;
