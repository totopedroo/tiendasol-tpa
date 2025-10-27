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
        <ItemCollection
          titulo={`Más del vendedor`}
          query={`?vendedor=${producto.vendedor}`}
        />

        {/* Generar un ItemCollection por cada categoría del producto */}
        {producto.categorias &&
          producto.categorias.length > 0 &&
          producto.categorias.map((categoria) => (
            <ItemCollection
              key={categoria}
              titulo={`Más de ${categoria}`}
              query={`?categoria=${categoria}`}
            />
          ))}
      </div>
    </div>
  );
};
