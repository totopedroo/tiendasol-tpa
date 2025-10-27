import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Filtros.css";
import { categorias } from "../../mockdata/Categorias";

export const Filtros = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Estado local para los filtros
  const [categoria, setCategoria] = useState(searchParams.get("categoria") || "");
  const [vendedor, setVendedor] = useState(searchParams.get("vendedor") || "");
  const [precioMin, setPrecioMin] = useState(searchParams.get("precioMin") || "");
  const [precioMax, setPrecioMax] = useState(searchParams.get("precioMax") || "");
  const [ordenPrecio, setOrdenPrecio] = useState(searchParams.get("ordenPrecio") || "");

  // Actualizar los parámetros de URL cuando cambien los filtros
  const actualizarFiltros = () => {
    const params = new URLSearchParams(searchParams);
    
    // Mantener el término de búsqueda si existe
    const titulo = searchParams.get("titulo");
    if (titulo) params.set("titulo", titulo);
    
    // Agregar o eliminar filtros según su valor
    if (categoria) {
      params.set("categoria", categoria);
    } else {
      params.delete("categoria");
    }
    
    if (vendedor) {
      params.set("vendedor", vendedor);
    } else {
      params.delete("vendedor");
    }
    
    if (precioMin) {
      params.set("precioMin", precioMin);
    } else {
      params.delete("precioMin");
    }
    
    if (precioMax) {
      params.set("precioMax", precioMax);
    } else {
      params.delete("precioMax");
    }
    
    if (ordenPrecio) {
      params.set("ordenPrecio", ordenPrecio);
    } else {
      params.delete("ordenPrecio");
    }
    
    // Resetear a página 1 cuando cambien los filtros
    params.set("page", "1");
    
    setSearchParams(params);
  };

  // Aplicar filtros con un pequeño delay para evitar demasiadas llamadas
  useEffect(() => {
    const timer = setTimeout(() => {
      actualizarFiltros();
    }, 500);
    return () => clearTimeout(timer);
  }, [categoria, vendedor, precioMin, precioMax, ordenPrecio]);

  const limpiarFiltros = () => {
    setCategoria("");
    setVendedor("");
    setPrecioMin("");
    setPrecioMax("");
    setOrdenPrecio("");
  };

  return (
    <div className="filtros">
      <div className="container-titulo">
        <div className="titulo">Filtros</div>
      </div>

      <div className="container-inputs">
        <div className="filter-field">
          <div className="text-wrapper-2">Categoría</div>
          <select 
            value={categoria} 
            onChange={(e) => setCategoria(e.target.value)}
          > 
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
            value={vendedor}
            onChange={(e) => setVendedor(e.target.value)}
            placeholder="Buscar por vendedor..."
          />
        </div>

        <div className="filter-field">
          <div className="text-wrapper-3">Precio</div>
          <div className="price-range-inputs">
            <input 
              type="number" 
              placeholder="Mín"
              value={precioMin}
              onChange={(e) => setPrecioMin(e.target.value)}
            />
            <input 
              type="number" 
              placeholder="Máx"
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-field">
          <div className="text-wrapper-2">Ordenar por precio</div>
          <select 
            value={ordenPrecio} 
            onChange={(e) => setOrdenPrecio(e.target.value)}
          >
            <option value="">Sin ordenar</option>
            <option value="asc">Menor a mayor</option>
            <option value="desc">Mayor a menor</option>
          </select>
        </div>

        <div className="filter-field">
          <button 
            onClick={limpiarFiltros}
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
};
