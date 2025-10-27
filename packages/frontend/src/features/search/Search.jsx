import { useState } from "react";
import React from "react";
import { Filtros } from "../../components/filtros/Filtros";
import { Paginacion } from "../../components/paginacion/Paginacion";
import { Resultados } from "../../components/resultados/Resultados";
import "./Search.css";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// tiendasol.com/search?q="titulo"&categoria="celulares"
export const Search = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  /* Hook que lee los parametros de la URL*/ 
  const [searchParams] = useSearchParams();

  const cargarProductos = async (page = 1) => {
    const productosCargados = [];
    console.log("Productos cargados:", productosCargados);
    setProductos(productosCargados.data);
    setProductosFiltrados(productosCargados.data);
    setCurrentPage(page);
    setTotalPaginas(productosCargados.totalPaginas);
  };

  const [tituloFromURL, setSearchQuery] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");

  useEffect(() => {
      const categoryFromURL = searchParams.get('categoria');
        if (categoryFromURL) {
            setCategoriaSeleccionada(categoryFromURL.toLowerCase());
        }
        const tituloFromURL = searchParams.get('titulo');
        if (tituloFromURL) {
            setSearchQuery(tituloFromURL.toLocaleLowerCase());
        }
        cargarProductos(1, tituloFromURL, categoryFromURL);

    }, [searchParams]); 

  return (
    <div className="contenido">
      <div className="container">
        <div className="search-results-container">
          <div className="container-titulo">
            <div className="titulo">Resultados para {tituloFromURL}</div>

            <div className="container-paginacion">
              <select>
                <option>Mas Vendido</option>
                <option></option>
              </select>
              <Paginacion className="navbar" />
            </div>
          </div>
          <div className="container-resultados">
            <Filtros categoriaSeleccionada={categoriaSeleccionada} />
            <Resultados />
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
