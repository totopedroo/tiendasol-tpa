import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import "./Filtros.css";
import { getCategorias } from "../../service/categoriasService";
import { getVendedores } from "../../service/usuariosService";

export const Filtros = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Estado local para los filtros
  const [categoria, setCategoria] = useState(searchParams.get("categoria") || "");
  const [vendedor, setVendedor] = useState(searchParams.get("vendedor") || "");
  const [precioMin, setPrecioMin] = useState(searchParams.get("precioMin") || "");
  const [precioMax, setPrecioMax] = useState(searchParams.get("precioMax") || "");
  const [orden, setOrden] = useState(searchParams.get("ordenPor") || "");

  // Estado para las categorías obtenidas del backend
  const [categorias, setCategorias] = useState([]);
  const [vendedores, setVendedores] = useState([]);

  // Actualizar los parámetros de URL cuando cambien los filtros
  const actualizarFiltros = useCallback(() => {
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

    if (orden) {
      params.set("ordenPor", orden);
    } else {
      params.delete("ordenPor");
    }

    // Resetear a página 1 cuando cambien los filtros
    params.set("page", "1");

    setSearchParams(params);
  });

  // Cargar categorías del backend
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const response = await getCategorias();
        setCategorias(response.categorias || []);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
        setCategorias([]);
      }
    };
    cargarCategorias();
  }, []);

  // Cargar vendedores del backend
  useEffect(() => {
    const cargarVendedores = async () => {
      try {
        const response = await getVendedores();
        setVendedores(response || []);
      } catch (error) {
        console.error("Error al cargar vendedores:", error);
        setVendedores([]);
      }
    };
    cargarVendedores();
  }, []);


  // Aplicar filtros con un pequeño delay para evitar demasiadas llamadas
  useEffect(() => {
    const timer = setTimeout(() => {
      actualizarFiltros();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const limpiarFiltros = () => {
    setCategoria("");
    setVendedor("");
    setPrecioMin("");
    setPrecioMax("");
    setOrden("");
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
            <option value="">Todas</option>
            {categorias.map((cat) => (
              <option key={cat._id} value={cat.nombre}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <div className="text-wrapper-2">Vendedor</div>
          <select
            value={vendedor}
            onChange={(e) => setVendedor(e.target.value)}
          >
            <option value="">Todos</option>
            {vendedores.map((v) => (
              <option key={v._id} value={v._id}>
                {v.nombre}
              </option>
            ))}
          </select>
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
          <div className="text-wrapper-2">Ordenar por</div>
          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="">Sin ordenar</option>
            <option value="MayorPrecio">Mayor precio</option>
            <option value="MenorPrecio">Menor precio</option>
            <option value="MasVendidos">Mas vendidos</option>
          </select>
        </div>

        <div className="filter-field">
          <button className="btn btn-primary btn-medium"
            onClick={actualizarFiltros}
          >
            Aplicar filtros
          </button>
        </div>

        <div className="filter-field">
          <button className="btn btn-primary btn-medium"
            onClick={limpiarFiltros}
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
};
