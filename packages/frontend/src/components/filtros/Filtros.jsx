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

  // Estado backend
  const [categorias, setCategorias] = useState([]);
  const [vendedores, setVendedores] = useState([]);

  const actualizarFiltros = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    const titulo = searchParams.get("titulo");
    if (titulo) params.set("titulo", titulo);

    categoria ? params.set("categoria", categoria) : params.delete("categoria");
    vendedor ? params.set("vendedor", vendedor) : params.delete("vendedor");
    precioMin ? params.set("precioMin", precioMin) : params.delete("precioMin");
    precioMax ? params.set("precioMax", precioMax) : params.delete("precioMax");
    orden ? params.set("ordenPor", orden) : params.delete("ordenPor");

    params.set("page", "1");

    setSearchParams(params);
  });

  // Cargar categorías
  useEffect(() => {
    const cargar = async () => {
      try {
        const resp = await getCategorias();
        setCategorias(resp.categorias || []);
      } catch {
        setCategorias([]);
      }
    };
    cargar();
  }, []);

  useEffect(() => {
    setCategoria(searchParams.get("categoria") || "");
    setVendedor(searchParams.get("vendedor") || "");
    setPrecioMin(searchParams.get("precioMin") || "");
    setPrecioMax(searchParams.get("precioMax") || "");
    setOrden(searchParams.get("ordenPor") || "");
  }, [searchParams]);

  // Cargar vendedores
  useEffect(() => {
    const cargar = async () => {
      try {
        const resp = await getVendedores();
        setVendedores(resp || []);
      } catch {
        setVendedores([]);
      }
    };
    cargar();
  }, []);

  // Auto-aplicar filtros después de 500 ms
  useEffect(() => {
    const timer = setTimeout(() => actualizarFiltros(), 500);
    return () => clearTimeout(timer);
  }, [categoria, vendedor, precioMin, precioMax, orden]);

  const limpiarFiltros = () => {
    setCategoria("");
    setVendedor("");
    setPrecioMin("");
    setPrecioMax("");
    setOrden("");
  };

  return (
    <div className="filtros flex flex-col items-start gap-3">
      <div className="container-titulo">
        <div className="titulo">Filtros</div>
      </div>

      <div className="container-inputs flex flex-col items-start gap-4">

        {/* CATEGORIA */}
        <div className="filter-field flex flex-col gap-2">
          <div className="text-wrapper-2 flex items-center justify-center">
            Categoría
          </div>
          <select
            className="select"
            name="categoria"
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

        {/* VENDEDOR */}
        <div className="filter-field flex flex-col gap-2">
          <div className="text-wrapper-2 flex items-center justify-center">
            Vendedor
          </div>
          <select
            className="select"
            name="vendedor"
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

        {/* PRECIO */}
        <div className="filter-field flex flex-col gap-2">
          <div className="text-wrapper-3 flex items-center justify-start">
            Precio
          </div>
          <div className="price-range-inputs flex gap-2">
            <input
              className="input"
              name="precioMin"
              type="number"
              placeholder="Mín"
              value={precioMin}
              onChange={(e) => setPrecioMin(e.target.value)}
            />
            <input
              className="input"
              name="precioMax"
              type="number"
              placeholder="Máx"
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
            />
          </div>
        </div>

        {/* ORDEN */}
        <div className="filter-field flex flex-col gap-2">
          <div className="text-wrapper-2 flex items-center justify-center">
            Ordenar por
          </div>
          <select
            className="select"
            name="ordenPor"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="">Sin ordenar</option>
            <option value="MayorPrecio">Mayor precio</option>
            <option value="MenorPrecio">Menor precio</option>
            <option value="MasVendidos">Más vendidos</option>
          </select>
        </div>

        {/* BOTÓN APLICAR */}
        <div className="filter-field flex flex-col gap-2">
          <button className="btn btn-primary btn-medium" onClick={actualizarFiltros}>
            Aplicar filtros
          </button>
        </div>

        {/* BOTÓN LIMPIAR */}
        <div className="filter-field flex flex-col gap-2">
          <button className="btn btn-primary btn-medium" onClick={limpiarFiltros}>
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
};