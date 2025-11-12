/* eslint-disable react/prop-types */
import React from "react";
import { Minus } from "../icons/Minus";
import { Plus } from "../icons/Plus";
import { Delete } from "../icons/Delete";
import { Button } from "../button/Button";
import { useCarrito } from "../../context/CarritoContext";
import "./CheckoutItem.css";

export const CheckoutItem = ({ item }) => {
  const { actualizarCantidad, eliminarDelCarrito } = useCarrito();

  const incrementar = () => {
    actualizarCantidad(item._id, item.cantidad + 1);
  };

  const disminuir = () => {
    if (item.cantidad > 1) {
      actualizarCantidad(item._id, item.cantidad - 1);
    } else {
      eliminarDelCarrito(item._id);
    }
  };

  const quitar = () => {
    eliminarDelCarrito(item._id);
  };

  const subtotal = item.precio * item.cantidad;

  return (
    <div className="checkout-item flex items-start">
      <img
        src={item.fotos?.[0] || "/images/logo.png"}
        alt={item.titulo}
        className="rectangle"
      />

      <div className="item-content flex flex-col items-center">
        <div className="item-header flex items-center justify-between">
          <div className="item-title-price flex flex-col items-center">
            <div className="text-wrapper">{item.titulo}</div>
            <div className="text-wrapper-2">
              ${item.precio.toLocaleString()} {item.moneda || "ARS"}
            </div>
          </div>
          <div  onClick={quitar} style={{ cursor: "pointer" }}>
           <Delete className="delete" />
          </div>
        </div>

        <div className="item-actions">
          <div className="quantity-section">
            <div className="text-wrapper-3">Cantidad</div>
            <div className="quantity-controls">
              <Button
                variant="icon"
                icon={<Minus />}
                size="small"
                aria-label="Disminuir cantidad"
                onClick={disminuir}
              />
              <div className="quantity-display">
                <div className="text-wrapper-4">{item.cantidad}</div>
              </div>
              <Button
                variant="icon"
                icon={<Plus />}
                size="small"
                aria-label="Aumentar cantidad"
                onClick={incrementar}
              />
            </div>
          </div>

          <div className="subtotal-section">
            <div className="text-wrapper-3">Subtotal</div>
            <div className="text-wrapper-5">
              ${subtotal.toLocaleString()} {item.moneda || "ARS"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
