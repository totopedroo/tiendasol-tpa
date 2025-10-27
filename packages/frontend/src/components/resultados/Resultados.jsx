/* eslint-disable react/prop-types */
import React from "react";
import "./Resultados.css";
import { Item } from "../item/Item";
import { ItemSkeleton } from "../item/ItemSkeleton";

export const Resultados = ({ itemsPaginados = [], loading = false }) => {
  // Si está cargando o no hay items, mostrar skeletons
  if (loading || !itemsPaginados.length) {
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
      {itemsPaginados.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};
