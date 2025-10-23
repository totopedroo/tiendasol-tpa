import React from "react";
import "./Filtros.css";

export const Filtros = () => {
  return (
    <div className="filtros">
      <div className="container-titulo">
        <div className="titulo">Filtros</div>
      </div>

      <div className="container-inputs">
        <div className="div-2">
          <div className="text-wrapper-2">Categoría</div>

          <select></select>
        </div>

        <div className="div-2">
          <div className="text-wrapper-2">Vendedor</div>

        <input></input>
        </div>

        <div className="div-2">
          <div className="text-wrapper-3">Precio</div>

          <div className="frame-2">
        <input></input>
        <input></input>
          </div>
        </div>
      </div>
    </div>
  );
};
