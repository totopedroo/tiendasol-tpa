/* eslint-disable react/prop-types */
import React from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft } from "../icons/ArrowLeft";
import { ArrowRight } from "../icons/ArrowRight";
import "./Paginacion.css";

export const Paginacion = ({ paginaActual = 1, totalPaginas = 1 }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return;
    
    const params = new URLSearchParams(searchParams);
    params.set("page", nuevaPagina.toString());
    setSearchParams(params);
  };

  const generarNumerosPagina = () => {
    const paginas = [];
    const maxPaginas = 5; 

    if (totalPaginas <= maxPaginas) {
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      if (paginaActual <= 3) {
        paginas.push(1, 2, 3, 4, "...", totalPaginas);
      } else if (paginaActual >= totalPaginas - 2) {
        paginas.push(
          1,
          "...",
          totalPaginas - 3,
          totalPaginas - 2,
          totalPaginas - 1,
          totalPaginas
        );
      } else {
        paginas.push(
          1,
          "...",
          paginaActual - 1,
          paginaActual,
          paginaActual + 1,
          "...",
          totalPaginas
        );
      }
    }

    return paginas;
  };

  const paginas = generarNumerosPagina();

  return (
    <div className="paginacion">
      <div
        className={`arrow ${paginaActual === 1 ? "disabled" : ""}`}
        onClick={() => cambiarPagina(paginaActual - 1)}
      >
        <ArrowLeft />
      </div>

      {paginas.map((pagina, index) => {
        if (pagina === "...") {
          return (
            <div key={`ellipsis-${index}`} className="page-ellipsis">
              ...
            </div>
          );
        }

        return (
          <div
            key={pagina}
            className={pagina === paginaActual ? "current-page" : "page-number"}
            onClick={() => cambiarPagina(pagina)}
          >
            <div className="text-wrapper">{pagina}</div>
          </div>
        );
      })}

      <div
        className={`arrow ${paginaActual === totalPaginas ? "disabled" : ""}`}
        onClick={() => cambiarPagina(paginaActual + 1)}
      >
        <ArrowRight />
      </div>
    </div>
  );
};
