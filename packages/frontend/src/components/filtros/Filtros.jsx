/* eslint-disable react/prop-types */
import React from "react";
import "./Filtros.css";
import { categorias } from "../../mockdata/Categorias";

export const Filtros = ({categoriaSeleccionada = "todas"}) => {

  return (
    <div className="filtros">
      <div className="container-titulo">
        <div className="titulo">Filtros</div>
      </div>

      <div className="container-inputs">
        <div className="filter-field">
          <div className="text-wrapper-2">Categoría</div>
            <select className="select-categoria" value={categoriaSeleccionada}>
              
              <option value="todas">Todas las categorías</option>
                {categorias.map((categoria) => (
                  <option key={categoria.nombre} value={categoria.nombre.toLowerCase()}>
                    {categoria.nombre}
                  </option>  
                ))}
          
          </select>
        </div>

        <div className="filter-field">
          <div className="text-wrapper-2">Vendedor</div>
          <input
            className="nombre-vendedor"
            placeholder="Nombre del vendedor"
          ></input>
        </div>

        <div className="filter-field">
          <div className="text-wrapper-2">Precio</div>
          <div className="rango-de-precios-inputs">
            <input className="precio-minimo" placeholder="Min"></input>
            <input className="precio-maximo" placeholder="Máx"></input>
          </div>
        </div>
      </div>
    </div>
  );
};
