/* eslint-disable react/prop-types */
import React from "react";
import "./DetallePedido.css";
import { HistorialItem } from "../historialItem/HistorialItem";
import { Button } from "../button/Button";

export const DetallePedido = ({ pedido }) => {
  if (!pedido) return null;

  // Formatear fecha
  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Calcular total
  const calcularTotal = () => {
    if (!pedido.items || pedido.items.length === 0) return 0;
    return pedido.items.reduce((total, item) => {
      return total + item.precio * item.cantidad;
    }, 0);
  };

  const total = calcularTotal();

  return (
    <div className="pedido-container">
      <div className="pedido-header">
        <div className="pedido-info">
          <div className="text-wrapper">
            Pedido #{pedido._id?.slice(-8) || "N/A"}
          </div>

          <p className="p">
            {formatearFecha(pedido.createdAt || pedido.fecha)}
          </p>
        </div>

        <div className="status-badge">
          <div className="text-wrapper-2">{pedido.estado || "PENDIENTE"}</div>
        </div>
      </div>

      <div className="items-section">
        {pedido.items && pedido.items.length > 0 ? (
          pedido.items.map((item, index) => (
            <HistorialItem key={index} itemId={item} />
          ))
        ) : (
          <div>No hay items en este pedido</div>
        )}
      </div>

      <div className="order-summary">
        <div className="total-row">
          <div className="text-wrapper-8">Total</div>

          <div className="text-wrapper-7">${total.toLocaleString("es-AR")}</div>
        </div>

        <div className="address-row">
          <div className="text-wrapper-8">Dirección de entrega</div>

          <div className="text-wrapper-7">
            {pedido.direccionEntrega?.calle || "No especificada"}
            {pedido.direccionEntrega?.numero
              ? ` ${pedido.direccionEntrega.numero}`
              : ""}
          </div>
        </div>
      </div>

      <div className="order-actions">
        <Button variant="warning">Historial de estados</Button>

        {pedido.estado === "PENDIENTE" ? <></> : <Button variant="danger">Cancelar pedido</Button>}
      </div>
    </div>
  );
};
