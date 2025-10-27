import React from "react";
import { SearchIcon } from "../../components/icons/Search";
import { ItemCollection } from "../../components/itemCollection/ItemCollection";
import "./Home.css";
import { CategoryCollection } from "../../components/categoryCollection/CategoryCollection";
import { Button } from "@mui/joy";

export const Home = () => {
  return (
    <div className="contenido">
      <div className="container">
        <div className="search-section">
          <div className="search-bar-container">
            <div className="search-input-wrapper">
              <input
                className="search-input"
                placeholder="Buscar productos..."
              />
              <Button variant="outlined" onClick={() => {}}>
                <SearchIcon className="search-icon" />
              </Button>
            </div>
          </div>
        </div>
        <ItemCollection />
        <CategoryCollection />
      </div>
    </div>
  );
};
