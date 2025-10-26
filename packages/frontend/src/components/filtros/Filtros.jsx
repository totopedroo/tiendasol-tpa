import React, { use } from "react";
import "./Filtros.css";

export const Filtros = ({ categoriaSeleccionada = "todas"}) => {

  const categorias = [
    "Autos",
    "Tecnología",
    "Ropa",
    "Hogar",
    "Herramientas",
    "Cocina",
    "Joyas",
    "Instrumentos",
    "Consolas",
    "Bebés",
    "Deportes",
  ];

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
            {categorias.map((nombre) => (
              <option key={nombre} value={nombre.toLowerCase()}>
                {nombre}
              </option>
            ))}
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
