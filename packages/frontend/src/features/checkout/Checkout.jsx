import React from "react";
import "./Checkout.css";
import { ArrowLeft } from "../../components/icons/ArrowLeft";
import { CheckoutItem } from "../../components/checkoutItem/CheckoutItem";
import { Edit } from "../../components/icons/Edit";

export const Checkout = () => {
  return (
    <div className="checkout-screen flex-center-column">
      <div className="container">
        <div className="checkout-container flex-column-stretch">
          <div className="titulo flex-row-between">
            <div className="text-wrapper flex-row-center">Carrito</div>

            <div className="back-button-container flex-row-center">
              <ArrowLeft />
              <div className="back-button-text">Volver atrás</div>
            </div>
          </div>

          <div className="checkout-contenido flex-row-start">
            <div className="pedido">
              <CheckoutItem />
            </div>
            <div className="info-pedido flex-center-column">
              <div className="detalle-pedido flex-center-column">
                <div className="direccion-entrega-row flex-row-between">
                  <div className="text-wrapper">Dirección de entrega</div>

                  <div className="direccion-entrega-info flex-row-center">
                    <div className="text-wrapper-2">Calle Verdadera 1234</div>

                    <Edit />
                  </div>
                </div>

                <div className="articulos-count-row flex-row-between">
                  <div className="text-wrapper">Articulos</div>

                  <div className="text-wrapper-2">6</div>
                </div>

                <div className="total-row flex-row-between">
                  <div className="text-wrapper-3">Total</div>

                  <div className="text-wrapper-3">$333.000</div>
                </div>
              </div>

              <div className="boton">
                <div className="text-wrapper-4">Realizar Pedido</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
