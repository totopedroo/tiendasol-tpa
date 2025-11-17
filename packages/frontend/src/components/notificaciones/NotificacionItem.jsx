/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { parseNotificacion } from "../../utils/parseNotificacion";
import "./NotificacionItem.css";

export const NotificacionItem = ({ notificacion, userId, onVerDetalle }) => {
  const data = parseNotificacion(notificacion);

  const handleClick = () => onVerDetalle(notificacion);

  const formatearPedidoId = (id) =>
    id ? `#${id.slice(-6)}` : "Pedido";

  return (
    <Link
      to={`/pedidos/${notificacion.pedido}`}
      className={`notificacion-item flex items-start gap-3 ${
        notificacion.leida ? "leida" : ""
      }`}
      onClick={handleClick}
    >
      <div className="notificacion-contenido">
        
        {/* Título limpio */}
        <div className="notificacion-titulo">
          {data.titulo} {formatearPedidoId(notificacion.pedido)}
        </div>

        {/* Emisor */}
        {data.emisor && (
          <div className="notificacion-emisor">
            Enviado por: <b>{data.emisor}</b>
          </div>
        )}

        {/* Productos */}
        <div className="notificacion-productos">
          <b>Productos:</b> {data.productos}
        </div>

        {/* Total */}
        <div className="notificacion-total">
          <b>Total:</b> {data.total}
        </div>

        {/* Dirección */}
        <div className="notificacion-direccion">
          <b>Entrega:</b> {data.direccion}
        </div>

        <div className="notificacion-acciones flex items-center gap-4">
          <span className="ver-detalle">Ver detalle →</span>
        </div>
      </div>
    </Link>
  );
};