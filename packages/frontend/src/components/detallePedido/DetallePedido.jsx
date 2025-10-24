import React from "react";
import "./DetallePedido.css";
import { HistorialItem } from "../historialItem/HistorialItem";

export const DetallePedido = () => {
  return (
    <div className="frame">
      <div className="div">
        <div className="div-2">
          <div className="text-wrapper">Pedido #12345679</div>

          <p className="p">21 de Octubre de 2025</p>
        </div>

        <div className="div-wrapper">
          <div className="text-wrapper-2">PENDIENTE</div>
        </div>
      </div>

      <div className="frame-wrapper">
        <HistorialItem />
      </div>

      <div className="div-6">
        <div className="div">
          <div className="text-wrapper-7">Total</div>

          <div className="text-wrapper-8">$300.000</div>
        </div>

        <div className="div-7">
          <div className="text-wrapper-7">Dirección de entrega</div>

          <div className="text-wrapper-8">Calle Verdadera 1234</div>
        </div>
      </div>

      <div className="div-7">
        <div className="div-wrapper-2">
          <div className="text-wrapper-7">Historial de estados</div>
        </div>

        <div className="div-wrapper-3">
          <div className="text-wrapper-7">Cancelar pedido</div>
        </div>
      </div>
    </div>
  );
};
