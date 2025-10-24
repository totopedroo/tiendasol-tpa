import React from "react";
import { ItemCollection } from "../../components/itemCollection/ItemCollection";
import { ItemDetail } from "../../components/itemDetail/ItemDetail";
import "./Producto.css";

export const Producto = () => {
  return (
    <div className="contenido">
      <div className="container">
        <ItemDetail />
        <ItemCollection />
        <ItemCollection />
      </div>
    </div>
  );
};
