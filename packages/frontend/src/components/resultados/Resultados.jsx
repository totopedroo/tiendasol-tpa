/* eslint-disable react/prop-types */
import React from "react";
import "./Resultados.css";
import { Item } from "../item/Item";
import { ItemSkeleton } from "../item/ItemSkeleton";

export const Resultados = ({ productos = [], loading = false, error = null }) => {

  if (error) {
    return (
      <div className="resultados">
        <div className="mensaje-error">{error}</div>
      </div>
    );
  }

  if (!productos.length) {
    return (
      <div className="resultados">
        <div className="mensaje-estado">
          No se encontraron productos con los criterios de búsqueda.
        </div>
      </div>
    );
  }

  // Si está cargando o no hay items, mostrar skeletons
  if (loading) {
    return (
      <div className="resultados">
        {Array.from({ length: 12 }).map((_, i) => (
          <ItemSkeleton key={i} />
        ))}
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
