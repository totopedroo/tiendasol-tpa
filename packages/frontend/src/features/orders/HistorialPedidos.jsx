import React from "react";
import { User } from "../../components/icons/User";
import "./HistorialPedidos.css";
import { Paginacion } from "../../components/paginacion/Paginacion";
import { DetallePedido } from "../../components/detallePedido/DetallePedido";

export const HistorialPedidos = () => {
  return (
    <div className="contenido">
      <div className="container">
        <div className="user-profile-section">
          <div className="user-wrapper">
            <User className="user-instance" />
          </div>

          <div className="user-info">
            <div className="text-wrapper">Juan Martinez</div>

            <div className="text-wrapper-2">Comprador</div>
          </div>
        </div>

        <div className="historial-screen">
          <div className="container-titulo">
            <div className="titulo">Historial de pedidos</div>

            <div className="container-paginacion">
              <select></select>
              <Paginacion />
            </div>
          </div>
          <div className="pedidos-list-container">
            <DetallePedido />
          </div>
        </div>
      </div>
    </div>
  );
};
