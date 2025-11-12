import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filtros } from "../../components/filtros/Filtros";
import { Paginacion } from "../../components/paginacion/Paginacion";
import { Resultados } from "../../components/resultados/Resultados";
import { buscarProductos, getProductsSlowly } from "../../service/productosService";
import "./Search.css";

// tiendasol.com/search?q="titulo"&categoria="celulares"
export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginacion, setPaginacion] = useState({
    pagina: 1,
    perPage: 10,
    total: 0,
    totalPaginas: 0,
  });

const fetchProductos = async () => {
  setLoading(true);
  setError(null);
  
  try {
    // Construir objeto de parámetros desde la URL
    const params = {};
    
    // Obtener todos los parámetros de la URL
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    
    // Si no hay página, usar página 1 por defecto
    if (!params.page) {
      params.page = 1;
    }
    
    // Si no hay limit, usar 10 por defecto
    if (!params.limit) {
      params.limit = 10;
    }

    const response = await buscarProductos(params);
    
    setProductos(response.data || []);
    setPaginacion({
      pagina: response.pagina || 1,
      perPage: response.perPage || 10,
      total: response.total || 0,
      totalPaginas: response.totalPaginas || 0,
    });
  } catch (err) {
    console.error("Error al buscar productos:", err);
    setError("Error al cargar los productos. Por favor, intenta de nuevo.");
    setProductos([]);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => { fetchProductos() }, [searchParams]);

  const searchTerm = searchParams.get("titulo") || "";
  const limit = searchParams.get("limit") || "10";

  const handleLimitChange = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", e.target.value);
    params.set("page", "1"); // Resetear a página 1 cuando cambie el límite
    setSearchParams(params);
  };

  return (
    <div className="contenido">
      <div className="container">
        <div className="search-results-container">
          <div className="container-titulo">
            <div className="titulo">
              {searchTerm
                ? `Resultados para "${searchTerm}"`
                : "Todos los productos"}
            </div>

            <div className="container-paginacion">
              <select value={limit} onChange={handleLimitChange}>
                <option value="10">10 por página</option>
                <option value="20">20 por página</option>
                <option value="50">50 por página</option>
              </select>
            </div>
          </div>
          <div className="container-resultados">
            <Filtros />
            <Resultados 
              productos={productos} 
              loading={loading} 
              error={error}
            />
          </div>
          <div className="bottom-pagination-wrapper">
            <div className="paginacion-wrapper">
              <Paginacion 
                paginaActual={paginacion.pagina}
                totalPaginas={paginacion.totalPaginas}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
