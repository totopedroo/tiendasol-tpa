import React from "react";
import { ItemCollection } from "../../components/itemCollection/ItemCollection";
import { ItemDetail } from "../../components/itemDetail/ItemDetail";
import "./Producto.css";
import { productos } from "../../mockdata/Productos";
import { useParams } from "react-router";

export const Producto = () => {
  const { id } = useParams();

  const producto = productos.find((p) => p.id === id);

  return (
    <div className="contenido">
      <div className="container">
        <ItemDetail item={producto} />
        <ItemCollection />
        <ItemCollection />
      </div>
    </div>
  );
};
