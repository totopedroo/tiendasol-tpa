import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ItemCollection } from "../../components/itemCollection/ItemCollection";
import "./Home.css";
import { CategoryCollection } from "../../components/categoryCollection/CategoryCollection";
import SearchBar from "../../components/searchBar/SearchBar";

export const Home = () => {
  const itemCollectionParams = useMemo(
    () => ({
      ordenPor: "MasVendidos",
    }),
    []
  );

  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/search?titulo=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <div className="contenido flex flex-col items-center gap-4">
      <div className="container">
        <div className="search-section flex items-center justify-center self-stretch">
          <div className="search-bar-container flex flex-col items-center justify-center gap-8">
            <div className="welcome-text flex flex-col gap-2 items-center text-center self-center">
              <h1 className="welcome-title">Bienvenido a TiendaSol</h1>
              <p className="welcome-subtitle">
                Tenemos todo lo que estás buscando
              </p>
            </div>
            <SearchBar
              onSearch={handleSearch}
              placeholder="Buscar productos..."
              variant="default"
              className="self-center"
            />
          </div>
        </div>
        <ItemCollection params={itemCollectionParams} />
        <CategoryCollection />
      </div>
    </div>
  );
};
