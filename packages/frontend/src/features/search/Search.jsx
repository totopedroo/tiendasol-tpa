import React from "react";
import { Filtros } from "../../components/filtros/Filtros";
import { Paginacion } from "../../components/paginacion/Paginacion";
import { Resultados } from "../../components/resultados/Resultados";
import "./Search.css";

export const Search = () => {
  return (
    <div className="contenido">
      <div className="container">
        <div className="search-results-container">
          <div className="container-titulo">
            <div className="titulo">Resultados para &quot;busqueda&quot;</div>

            <div className="container-paginacion">
              <select></select>
              <Paginacion className="navbar" />
            </div>
          </div>
          <div className="container-resultados">
            <Filtros />
            <Resultados itemCount={20} />
          </div>

          <div className="bottom-pagination-wrapper">
            <div className="paginacion-wrapper">
              <Paginacion />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
