import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ItemCollection } from "../../components/itemCollection/ItemCollection";
import "./Home.css";
import { CategoryCollection } from "../../components/categoryCollection/CategoryCollection";
import SearchBar from "../../components/searchBar/SearchBar";

export const Home = () => {
  const itemCollectionParams = useMemo(() => ({
    ordenPor: "MasVendidos"
  }), []);

  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/search?titulo=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <div className="contenido">
      <div className="container">
        <div className="search-section">
          <div className="search-bar-container">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Buscar productos..."
              variant="default"
            />
          </div>
        </div>
        <ItemCollection params={itemCollectionParams} />
        <CategoryCollection />
      </div>
    </div>
  );
};
