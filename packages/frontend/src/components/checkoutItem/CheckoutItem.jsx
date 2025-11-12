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

  const quitar = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    eliminarDelCarrito(item._id);
  };

  const subtotal = item.precio * item.cantidad;
  const moneda = (() => {
    switch (item.moneda) {
      case "PESO_ARG":
        return "$";
      case "DOLAR_USA":
        return "U$D";
      case "REAL":
        return "R$";
      default:
        return "$";
    }
  })();

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
              {moneda}
              {item.precio.toLocaleString()}
            </div>
          </div>
          <Button
            variant="clear"
            icon={<Delete />}
            size="small"
            aria-label="Eliminar producto"
            onClick={quitar}
          />
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
              {moneda}
              {subtotal.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
