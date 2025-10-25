import React from "react";
import "./DetallePedido.css";
import { HistorialItem } from "../historialItem/HistorialItem";
import { Button } from "../button/Button";

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
          <div className="text-wrapper-8">Total</div>

          <div className="text-wrapper-7">$300.000</div>
        </div>

        <div className="address-row">
          <div className="text-wrapper-8">Dirección de entrega</div>

          <div className="text-wrapper-7">Calle Verdadera 1234</div>
        </div>
      </div>

      <div className="order-actions">
        <Button variant="warning">Historial de estados</Button>

        <Button variant="danger">Cancelar pedido</Button>
      </div>
    </div>
  );
};
