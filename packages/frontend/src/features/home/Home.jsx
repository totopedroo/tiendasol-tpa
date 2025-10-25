import React, { useState, useEffect } from "react";
import { SearchIcon } from "../../components/icons/Search";
import { ItemCollection } from "../../components/itemCollection/ItemCollection";
import "./Home.css";
import { CategoryCollection } from "../../components/categoryCollection/CategoryCollection";
import { getProductsSlowly } from "../../service/productosService";

export const Home = () => {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    const productosCargados = await getProductsSlowly();
    setProductos(productosCargados);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

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
              <SearchIcon className="search-icon" />
            </div>
          </div>
        </div>
        <ItemCollection items={productos} />
        <CategoryCollection />
      </div>
    </div>
  );
};
