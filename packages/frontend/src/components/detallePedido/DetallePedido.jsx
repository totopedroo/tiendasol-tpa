/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./DetallePedido.css";
import { HistorialItem } from "../historialItem/HistorialItem";
import { Button } from "../button/Button";
import Popup from "../popups/PopUp";
import { cancelarPedido } from "../../service/pedidosService";
import PopUpOpciones from "../popups/PopUpOpciones";

export const DetallePedido = ({ pedido, onPedidoActualizado }) => {
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [cancelando, setCancelando] = useState(false);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tituloPopup, setTituloPopup] = useState("");

  const [mostrarPopupCancelar, setMostrarPopupCancelar] = useState(false);
  const [mensajeCancelar, setMensajeCancelar] = useState("");
  const [tituloCancelar, setTituloCancelar] = useState("");

  const handlerCancelar = async (e) => {
    setTituloCancelar("Cancelar pedido");
    setMensajeCancelar("¿Estás seguro que deseas cancelar este pedido?");
    setMostrarPopupCancelar(true);
  };

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

  const confirmarCancelacion = async () => {
    setMostrarPopupCancelar(false);
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
      <div className="historial-estados-lista flex flex-col gap-4">
        {pedido.historialEstados.map((cambio, index) => (
          <div key={index} className="historial-estado-item flex gap-4">
            <div className="estado-timeline flex flex-col items-center">
              <div className="estado-punto"></div>
              {index < pedido.historialEstados.length - 1 && (
                <div className="estado-linea"></div>
              )}
            </div>
            <div className="estado-contenido">
              <div className="estado-header flex items-center justify-between gap-2">
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
    <div className="pedido-container flex flex-col gap-6">
      <div className="pedido-header flex items-start justify-between">
        <div className="pedido-info flex flex-col gap-1">
          <div className="text-wrapper">
            Pedido #{pedido._id?.slice(-8) || "N/A"}
          </div>

          <p className="p flex items-center gap-2">
            {formatearFecha(pedido.createdAt || pedido.fecha)}
          </p>
        </div>

        <div className="status-badge flex items-center justify-center gap-2">
          <div className="text-wrapper-2 flex items-center justify-center">
            {pedido.estado || "PENDIENTE"}
          </div>
        </div>
      </div>

      <div className="items-section flex flex-col gap-4">
        {pedido.items && pedido.items.length > 0 ? (
          pedido.items.map((item, index) => (
            <HistorialItem key={index} item={item} />
          ))
        ) : (
          <div>No hay items en este pedido</div>
        )}
      </div>

      <div className="order-summary flex flex-col items-end gap-3">
        <div className="total-row flex items-center justify-between">
          <div className="text-wrapper-8 flex items-center justify-center">
            Total
          </div>

          <div className="text-wrapper-7 flex items-center justify-center">
            ${total.toLocaleString("es-AR")}
          </div>
        </div>

        <div className="address-row flex items-center justify-between">
          <div className="text-wrapper-8 flex items-center justify-center">
            Dirección de entrega
          </div>

          <div className="text-wrapper-7 flex items-center justify-center">
            {pedido.direccionEntrega?.calle || "No especificada"}
            {pedido.direccionEntrega?.numero
              ? ` ${pedido.direccionEntrega.numero}`
              : ""}
          </div>
        </div>
      </div>

      <div className="order-actions flex items-center justify-between gap-4">
        <Button variant="warning" onClick={handleMostrarHistorial}>
          Historial de estados
        </Button>

        {pedido.estado === "ENTREGADO" || pedido.estado === "CANCELADO" ? (
          <></>
        ) : (
          <Button
            variant="danger"
            onClick={handlerCancelar}
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

      <PopUpOpciones
        title={tituloCancelar}
        mensaje={mensajeCancelar}
        isOpen={mostrarPopupCancelar}
        onClose={() => setMostrarPopupCancelar(false)}
        onConfirm={confirmarCancelacion}
      />
    </div>
  );
};
