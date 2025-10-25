import React from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { ArrowLeft } from "../../components/icons/ArrowLeft";
import { CheckoutItem } from "../../components/checkoutItem/CheckoutItem";
import { Edit } from "../../components/icons/Edit";
import { Button } from "../../components/button/Button";

export const Checkout = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Equivalente a history.back()
  };

  return (
    <div className="checkout-screen flex flex-col items-center">
      <div className="container">
        <div className="checkout-container flex flex-col items-stretch flex-1">
          <div className="titulo flex items-center justify-between">
            <div className="text-wrapper flex items-center justify-center">
              Carrito
            </div>

            <div
              className="back-button-container flex items-center justify-center"
              onClick={handleGoBack}
              style={{ cursor: "pointer" }}
            >
              <ArrowLeft />
              <div className="back-button-text">Volver atrás</div>
            </div>
          </div>

          <div className="checkout-contenido flex items-center">
            <div className="pedido">
              <CheckoutItem />
            </div>
            <div className="info-pedido flex flex-col items-center">
              <div className="detalle-pedido flex flex-col items-center">
                <div className="direccion-entrega-row flex items-center justify-between">
                  <div className="text-wrapper">Dirección de entrega</div>

                  <div className="direccion-entrega-info flex items-center justify-center">
                    <div className="text-wrapper-2">Calle Verdadera 1234</div>

                    <Edit />
                  </div>
                </div>

                <div className="articulos-count-row flex items-center justify-between">
                  <div className="text-wrapper">Articulos</div>

                  <div className="text-wrapper-2">6</div>
                </div>

                <div className="total-row flex items-center justify-between">
                  <div className="text-wrapper-3">Total</div>

                  <div className="text-wrapper-3">$333.000</div>
                </div>
              </div>

              <Button variant="primary" fullWidth size="large">
                Realizar Pedido
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
