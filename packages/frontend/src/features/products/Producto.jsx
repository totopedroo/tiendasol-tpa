import React, { useState, useEffect } from "react";
import { ItemCollection } from "../../components/itemCollection/ItemCollection";
import { ItemDetail } from "../../components/itemDetail/ItemDetail";
import { ItemDetailSkeleton } from "../../components/itemDetail/ItemDetailSkeleton";
import "./Producto.css";
import { getProductoById } from "../../service/productosService";
import { useParams } from "react-router";

export const Producto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProducto = async () => {
      setLoading(true);
      const data = await getProductoById(id);
      setProducto(data);
      setLoading(false);
    };
    cargarProducto();
  }, [id]);

  return (
    <div className="contenido">
      <div className="container">
        {loading ? <ItemDetailSkeleton /> : <ItemDetail item={producto} />}

        {!loading && producto && (
          <>
            <ItemCollection
              titulo={`Más del vendedor`}
              params={{vendedor: producto.vendedor}}
            />

            {/* Generar un ItemCollection por cada categoría del producto */}
            {producto.categorias &&
              producto.categorias.length > 0 &&
              producto.categorias.map((categoria) => (
                <ItemCollection
                  key={categoria}
                  titulo={`Más de ${categoria}`}
                  params={{categorias:categoria}}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};
