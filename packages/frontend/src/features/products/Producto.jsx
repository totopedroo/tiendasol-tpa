import React, { useState, useEffect, useMemo } from "react";
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
      const producto = await getProductoById(id);
      setProducto(producto);
      setLoading(false);
    };
    cargarProducto();
  }, [id]);

  const vendedorParams = useMemo(
    () =>
      producto?.vendedor?._id ? { vendedor: producto.vendedor._id } : null,
    [producto?.vendedor?._id]
  );

  const categoriasParams = useMemo(() => {
    if (!producto?.categorias || producto.categorias.length === 0) return [];
    return producto.categorias.map((categoria) => ({
      nombre: categoria.nombre,
      params: { categoria: categoria.nombre },
    }));
  }, [producto?.categorias]);

  return (
    <div className="contenido">
      <div className="container">
        {loading ? <ItemDetailSkeleton /> : <ItemDetail item={producto} />}

        {!loading && producto && (
          <>
            {vendedorParams && (
              <ItemCollection
                titulo={`Más del vendedor`}
                params={vendedorParams}
              />
            )}

            {categoriasParams.map((categoria, index) => (
              <ItemCollection
                key={categoria.nombre}
                titulo={`Más de ${categoria.nombre}`}
                params={categoria.params}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
