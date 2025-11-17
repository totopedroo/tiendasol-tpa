/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./DetallePedido.css";
import { HistorialItem } from "../historialItem/HistorialItem";
import { Button } from "../button/Button";
import Popup from "../popups/PopUp";
import {
  cancelarPedido,
  cambiarEstadoPedido,
} from "../../service/pedidosService";
import PopUpOpciones from "../popups/PopUpOpciones";

export const DetallePedido = ({
  pedido,
  onPedidoActualizado,
  esVendedor = false,
  vendedorId = null,
}) => {
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [cancelando, setCancelando] = useState(false);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tituloPopup, setTituloPopup] = useState("");

  const [mostrarPopupCancelar, setMostrarPopupCancelar] = useState(false);
  const [mensajeCancelar, setMensajeCancelar] = useState("");
  const [tituloCancelar, setTituloCancelar] = useState("");

  // Estados para vendedor
  const [nuevoEstado, setNuevoEstado] = useState(pedido?.estado || "PENDIENTE");
  const [cambiandoEstado, setCambiandoEstado] = useState(false);

  // Estados disponibles para el selector
  const ESTADOS_PEDIDO = [
    "PENDIENTE",
    "CONFIRMADO",
    "EN_PREPARACION",
    "ENVIADO",
    "ENTREGADO",
    "CANCELADO",
  ];

  // Etiquetas amigables para los estados
  const ETIQUETAS_ESTADOS = {
    PENDIENTE: "Pendiente",
    CONFIRMADO: "Confirmado",
    EN_PREPARACION: "En Preparación",
    ENVIADO: "Enviado",
    ENTREGADO: "Entregado",
    CANCELADO: "Cancelado",
  };

  const handlerCancelar = async (e) => {
    setTituloCancelar("Cancelar pedido");
    setMensajeCancelar("¿Estás seguro que deseas cancelar este pedido?");
    setMostrarPopupCancelar(true);
  };

  if (!pedido) return null;

  // Filtrar items si es vendedor
  const itemsParaMostrar =
    esVendedor && vendedorId
      ? pedido.items.filter((item) => {
          // El item.producto puede estar poblado o no
          const productoId =
            typeof item.producto === "object"
              ? item.producto._id
              : item.producto;
          const vendedorDelProducto =
            typeof item.producto === "object" && item.producto.vendedor
              ? typeof item.producto.vendedor === "object"
                ? item.producto.vendedor._id
                : item.producto.vendedor
              : null;

          return vendedorDelProducto === vendedorId;
        })
      : pedido.items;

  // Formatear fecha
  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Calcular el total basado en los items a mostrar
  const total =
    esVendedor && vendedorId
      ? itemsParaMostrar.reduce((sum, item) => {
          const precio = item.precioUnitario || 0;
          const cantidad = item.cantidad || 0;
          return sum + precio * cantidad;
        }, 0)
      : pedido.total;

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

  const handleCambiarEstado = async () => {
    if (nuevoEstado === pedido.estado) {
      setTituloPopup("Información");
      setMensaje("El estado seleccionado es el mismo que el actual.");
      setMostrarPopup(true);
      return;
    }

    setCambiandoEstado(true);
    try {
      const motivo = `Estado cambiado a ${nuevoEstado}`;
      await cambiarEstadoPedido(pedido._id, nuevoEstado, motivo);

      setTituloPopup("¡Estado Actualizado!");
      setMensaje(`✅ El pedido ha sido marcado como ${nuevoEstado}.`);
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
      console.error("Error al cambiar el estado del pedido:", error);
      setTituloPopup("Error");
      setMensaje(
        `⚠️ ${error.response?.data?.message || "Error al cambiar el estado del pedido. Intenta nuevamente."}`
      );
      setMostrarPopup(true);
    } finally {
      setCambiandoEstado(false);
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

          {esVendedor && pedido.comprador && (
            <p
              className="p flex items-center gap-2"
              style={{ fontSize: "0.9em", color: "#666" }}
            >
              Comprador:{" "}
              {typeof pedido.comprador === "object"
                ? pedido.comprador.nombre
                : "Información no disponible"}
            </p>
          )}
        </div>

        <div className="status-badge flex items-center justify-center gap-2">
          <div className="text-wrapper-2 flex items-center justify-center">
            {pedido.estado || "PENDIENTE"}
          </div>
        </div>
      </div>

      <div className="items-section flex flex-col gap-4">
        {itemsParaMostrar && itemsParaMostrar.length > 0 ? (
          itemsParaMostrar.map((item, index) => (
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

        {esVendedor ? (
          // Vista para vendedor: selector de estado + botón guardar
          <div className="vendor-actions flex items-center gap-3">
            <select
              className="select"
              value={nuevoEstado}
              onChange={(e) => setNuevoEstado(e.target.value)}
              disabled={
                pedido.estado === "ENTREGADO" || pedido.estado === "CANCELADO"
              }
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "14px",
                cursor:
                  pedido.estado === "ENTREGADO" || pedido.estado === "CANCELADO"
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {ESTADOS_PEDIDO.map((estado) => (
                <option key={estado} value={estado}>
                  {ETIQUETAS_ESTADOS[estado] || estado}
                </option>
              ))}
            </select>
            <Button
              variant="primary"
              onClick={handleCambiarEstado}
              loading={cambiandoEstado}
              disabled={
                pedido.estado === "ENTREGADO" || pedido.estado === "CANCELADO"
              }
            >
              Guardar Estado
            </Button>
          </div>
        ) : // Vista para comprador: botón cancelar
        pedido.estado === "ENTREGADO" || pedido.estado === "CANCELADO" ? (
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
