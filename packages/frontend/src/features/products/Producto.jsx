import React, { useState, useEffect } from "react";
import { ItemCollection } from "../../components/itemCollection/ItemCollection";
import { ItemDetail } from "../../components/itemDetail/ItemDetail";
import "./Producto.css";
import { getProductoById } from "../../service/productosService";
import { useParams } from "react-router";

export const Producto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const cargarProducto = async () => {
      const data = await getProductoById(id);
      setProducto(data);
    };
    cargarProducto();
  }, [id]);

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
