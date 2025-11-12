/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import "./NotificacionItem.css";

export const NotificacionItem = ({ notificacion, userId, onVerDetalle }) => {
  const handleClick = () => {
    onVerDetalle(notificacion);
  };

  const formatearPedidoId = (id) => {
    if (!id) return "N/A";
    return id.length > 8 ? `#${id.slice(-8)}` : `#${id}`;
  };

  return (
    <Link
      to={`/users/${userId}`}
      className={`notificacion-item ${notificacion.leida ? "leida" : ""}`}
      onClick={handleClick}
    >
      <div className="notificacion-contenido">
        <div className="notificacion-titulo">
          Pedido {formatearPedidoId(notificacion.pedido)}
        </div>
        <div className="notificacion-mensaje">{notificacion.mensaje}</div>
        <div className="notificacion-acciones">
          <span className="ver-detalle">Ver detalle →</span>
        </div>
      </div>
    </Link>
  );
};
