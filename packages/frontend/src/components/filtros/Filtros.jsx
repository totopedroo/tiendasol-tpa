import React from "react";
import "./Filtros.css";

export const Filtros = () => {
  return (
    <div className="filtros">
      <div className="container-titulo">
        <div className="titulo">Filtros</div>
      </div>

      <div className="container-inputs">
        <div className="filter-field">
          <div className="text-wrapper-2">Categoría</div>
          <select  className="select-categoria">
            <option value="todas">Todas las categorías</option>
            {/* <option value="electronica">Electrónica</option>
            <option value="ropa">Ropa</option>
            <option value="hogar">Hogar</option>
            <option value="deportes">Deportes</option> 
            EJEMPLOS
            */}
          </select>
        </div>

        <div className="filter-field">
          <div className="text-wrapper-2">Vendedor</div>
          <input 
          className="nombre-vendedor"
          placeholder="Nombre del vendedor"
          >
              
          </input>
        </div>

        <div className="filter-field">
          <div className="text-wrapper-2">Precio</div>
          <div className="rango-de-precios-inputs">
            <input 
              className="precio-minimo"
              placeholder="Min"
            ></input>
            <input 
              className="precio-maximo"
              placeholder="Máx"
            >
            </input>
          </div>
        </div>
      </div>
    </div>
  );
};
