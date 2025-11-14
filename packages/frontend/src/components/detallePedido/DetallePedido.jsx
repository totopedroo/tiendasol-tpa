/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./DetallePedido.css";
import { HistorialItem } from "../historialItem/HistorialItem";
import { Button } from "../button/Button";
import Popup from "../popups/PopUp";
import { cancelarPedido } from "../../service/pedidosService";

export const DetallePedido = ({ pedido, onPedidoActualizado }) => {
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [cancelando, setCancelando] = useState(false);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tituloPopup, setTituloPopup] = useState("");

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

  const total = pedido.total;

  const handleMostrarHistorial = () => {
    setMostrarHistorial(true);
  };

  const handleCerrarHistorial = () => {
    setMostrarHistorial(false);
  };

  const handleCancelarPedido = async () => {
    if (!window.confirm("¿Estás seguro de que deseas cancelar este pedido?")) {
      return;
    }

    setCancelando(true);
    try {
      await cancelarPedido(pedido._id);

      setTituloPopup("¡Pedido Cancelado!");
      setMensaje("✅ El pedido ha sido cancelado exitosamente.");
      setMostrarPopup(true);

      // Esperar un momento antes de recargar
      setTimeout(() => {
        if (onPedidoActualizado) {
          onPedidoActualizado();
        } else {
          window.location.reload();
        }
      }, 1500);
    } catch (error) {
      console.error("Error al cancelar el pedido:", error);
      setTituloPopup("Error");
      setMensaje(
        `⚠️ ${error.response?.data?.message || "Error al cancelar el pedido. Intenta nuevamente."}`
      );
      setMostrarPopup(true);
    } finally {
      setCancelando(false);
    }
  };

  const handleCerrarPopup = () => {
    setMostrarPopup(false);
  };

  // Formatear fecha y hora para el historial
  const formatearFechaHora = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Generar contenido del historial
  const generarMensajeHistorial = () => {
    if (!pedido.historialEstados || pedido.historialEstados.length === 0) {
      return "No hay historial de cambios de estado disponible.";
    }

    return (
      <div className="historial-estados-lista">
        {pedido.historialEstados.map((cambio, index) => (
          <div key={index} className="historial-estado-item">
            <div className="estado-timeline">
              <div className="estado-punto"></div>
              {index < pedido.historialEstados.length - 1 && (
                <div className="estado-linea"></div>
              )}
            </div>
            <div className="estado-contenido">
              <div className="estado-header">
                <span className="estado-nombre">{cambio.estado}</span>
                <span className="estado-fecha">
                  {formatearFechaHora(cambio.createdAt)}
                </span>
              </div>
              <div className="estado-motivo">{cambio.motivo}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

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
            <HistorialItem key={index} item={item} />
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
        <Button variant="warning" onClick={handleMostrarHistorial}>
          Historial de estados
        </Button>

        {pedido.estado === "ENTREGADO" || pedido.estado === "CANCELADO" ? (
          <></>
        ) : (
          <Button
            variant="danger"
            onClick={handleCancelarPedido}
            loading={cancelando}
          >
            Cancelar pedido
          </Button>
        )}
      </div>

      <Popup
        title="Historial de Estados"
        isOpen={mostrarHistorial}
        onClose={handleCerrarHistorial}
        mensaje={generarMensajeHistorial()}
      />

      <Popup
        title={tituloPopup}
        isOpen={mostrarPopup}
        onClose={handleCerrarPopup}
        mensaje={mensaje}
      />
    </div>
  );
};
