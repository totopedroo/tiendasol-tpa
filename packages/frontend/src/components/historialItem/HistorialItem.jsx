/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./HistorialItem.css";
import { getProductoById } from "../../service/productosService";

export const HistorialItem = ({ itemId }) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItem = async () => {
    if (!itemId) return;
    setLoading(true);
    try {
      const response = await getProductoById(itemId);
      setItem(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [itemId]);

  if (!itemId) return null;
  if (loading) return <div>Cargando...</div>;
  if (error) return null;
  if (!item) return null;

  const subtotal = (item.precio || 0) * (item.cantidad || 0);
  const moneda = (() => {
    switch (item.moneda) {
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
  return (
    <div className="historial-item-container">
      <div className="rectangle">
        {item.producto?.fotos?.[0] && (
          <img
            src={item.producto.fotos[0]}
            alt={item.producto?.titulo || "Producto"}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>

      <div className="item-details">
        <div className="item-title-price">
          <div className="text-wrapper-3">
            {item.producto?.titulo || "Sin título"}
          </div>

          <div className="text-wrapper-4">
            {moneda}
            {(item.precio || 0).toLocaleString("es-AR")}
          </div>
        </div>

        <div className="item-summary">
          <div className="text-wrapper-5">Cantidad: {item.cantidad || 0}</div>

          <div className="text-wrapper-6">
            Subtotal: {moneda}
            {subtotal.toLocaleString("es-AR")}
          </div>
        </div>
      </div>
    </div>
  );
};
