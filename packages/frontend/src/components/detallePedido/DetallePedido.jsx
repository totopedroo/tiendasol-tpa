import React from "react";
import "./DetallePedido.css";
import { HistorialItem } from "../historialItem/HistorialItem";

export const DetallePedido = () => {
  return (
    <div className="pedido-container">
      <div className="pedido-header">
        <div className="pedido-info">
          <div className="text-wrapper">Pedido #12345679</div>

          <p className="p">21 de Octubre de 2025</p>
        </div>

        <div className="status-badge">
          <div className="text-wrapper-2">PENDIENTE</div>
        </div>
      </div>

      <div className="items-section">
        <HistorialItem />
      </div>

      <div className="order-summary">
        <div className="total-row">
          <div className="text-wrapper-7">Total</div>

          <div className="text-wrapper-8">$300.000</div>
        </div>

        <div className="address-row">
          <div className="text-wrapper-7">Dirección de entrega</div>

          <div className="text-wrapper-8">Calle Verdadera 1234</div>
        </div>
      </div>

      <div className="order-actions">
        <div className="history-button">
          <div className="text-wrapper-7">Historial de estados</div>
        </div>

        <div className="cancel-button">
          <div className="text-wrapper-7">Cancelar pedido</div>
        </div>
      </div>
    </div>
  );
};
