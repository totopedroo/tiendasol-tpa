/* eslint-disable react/prop-types */
import React from "react";
import "./Resultados.css";
import { Item } from "../item/Item";

export const Resultados = ({ productos = [], loading = false, error = null }) => {
  if (loading) {
    return (
      <div className="resultados">
        <div className="mensaje-estado">Cargando productos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="resultados">
        <div className="mensaje-error">{error}</div>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="resultados">
        <div className="mensaje-estado">
          No se encontraron productos con los criterios de búsqueda.
        </div>
      </div>
    );
  }

  return (
    <div className="resultados">
      {productos.map((producto) => (
        <Item key={producto._id} item={producto} />
      ))}
    </div>
  );
};
