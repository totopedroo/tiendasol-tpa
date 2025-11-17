/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./HistorialItem.css";
import { getProductoById } from "../../service/productosService";
import { ImageWithLoader } from "../imageWithLoader/ImageWithLoader";

export const HistorialItem = ({ item }) => {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItem = async () => {
    if (!item) return;
    setLoading(true);
    try {
      // Si el producto ya está poblado, usarlo directamente
      if (typeof item.producto === "object" && item.producto.titulo) {
        setProducto(item.producto);
        setLoading(false);
        return;
      }

      // Si no, hacer fetch del producto
      const response = await getProductoById(item.producto);
      setProducto(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [item]);

  if (!item) return null;
  if (loading) return <div>Cargando...</div>;
  if (error) return null;
  if (!producto) return null;

  const subtotal = (producto.precio || 0) * (item.cantidad || 0);
  const moneda = (() => {
    switch (producto.moneda) {
      case "PESO_ARG":
        return "$";
      case "DOLAR_USA":
        return "U$D";
      case "REAL":
        return "R$";
      default:
        return "$";
    }
  })();

  // Función para truncar texto
  const truncarTexto = (texto, maxCaracteres = 50) => {
    if (!texto) return "";
    if (texto.length <= maxCaracteres) return texto;
    return texto.substring(0, maxCaracteres) + "...";
  };

  return (
    <div className="historial-item-container flex items-center gap-4">
      <div className="rectangle">
        {producto?.fotos?.[0] && (
          <ImageWithLoader
            src={producto.fotos[0]}
            alt={producto?.titulo || "Producto"}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>

      <div className="item-details flex items-center justify-between">
        <div className="item-title-price inline-flex flex-col items-start">
          <div
            className="text-wrapper-3"
            title={producto?.titulo || "Sin título"}
          >
            {truncarTexto(producto?.titulo || "Sin título", 45)}
          </div>

          <div className="text-wrapper-4 flex items-center justify-center">
            {moneda}
            {(producto.precio || 0).toLocaleString("es-AR")}
          </div>
        </div>

        <div className="item-summary inline-flex flex-col items-end justify-center">
          <div className="text-wrapper-5 flex items-end justify-end">
            Cantidad: {item.cantidad || 0}
          </div>

          <div className="text-wrapper-6 flex items-end justify-end">
            Subtotal: {moneda}
            {subtotal.toLocaleString("es-AR")}
          </div>
        </div>
      </div>
    </div>
  );
};
