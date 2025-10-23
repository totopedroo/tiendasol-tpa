import React from "react";
import "./Checkout.css";
import { ArrowLeft } from "../../components/icons/ArrowLeft";
import { CheckoutItem } from "../../components/checkoutItem/CheckoutItem";
import { Edit } from "../../components/icons/Edit";

export const Checkout = () => {
  return (
    <div className="frame-screen">
      <div className="frame-15">
        <div className="titulo">
          <div className="text-wrapper">Carrito</div>

          <div className="frame">
            <ArrowLeft />
            <div className="div">Volver atrás</div>
          </div>
        </div>

        <div className="checkout-contenido">
          <div className="pedido">
            <CheckoutItem />
          </div>
          <div className="info-pedido">
            <div className="detalle-pedido">
              <div className="frame">
                <div className="text-wrapper">Dirección de entrega</div>

                <div className="div">
                  <div className="text-wrapper-2">Calle Verdadera 1234</div>

                  <Edit />
                </div>
              </div>

              <div className="frame">
                <div className="text-wrapper">Articulos</div>

                <div className="text-wrapper-2">6</div>
              </div>

              <div className="frame">
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
  );
};
