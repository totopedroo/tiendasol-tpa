/* eslint-disable react/prop-types */
import React from "react";
import { Minus } from "../icons/Minus";
import { Plus } from "../icons/Plus";
import { Delete } from "../icons/Delete";
import { Button } from "../button/Button";
import { useCarrito } from "../../context/CarritoContext";
import "./CheckoutItem.css";
import { ImageWithLoader } from "../imageWithLoader/ImageWithLoader";

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
      <ImageWithLoader
        src={item.fotos?.[0] || "/images/logo.png"}
        alt={item.titulo}
        className="rectangle"
      />

      <div className="item-content flex flex-col items-start justify-between">
        <div className="item-header flex items-start justify-between">
          <div className="item-title-price inline-flex flex-col items-start">
            <div className="text-wrapper flex items-center justify-center">
              {item.titulo}
            </div>
            <div className="text-wrapper-2 flex items-center justify-center">
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

        <div className="item-actions flex items-end justify-between">
          <div className="quantity-section inline-flex flex-col items-start justify-end gap-2">
            <div className="text-wrapper-3 flex items-center justify-center">
              Cantidad
            </div>
            <div className="quantity-controls flex items-center gap-2">
              <Button
                variant="icon"
                icon={<Minus />}
                size="small"
                aria-label="Disminuir cantidad"
                onClick={disminuir}
              />
              <div className="quantity-display flex items-center justify-center">
                <div className="text-wrapper-4 flex items-center justify-center">
                  {item.cantidad}
                </div>
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

          <div className="subtotal-section inline-flex flex-col items-end justify-end">
            <div className="text-wrapper-3 flex items-center justify-center">
              Subtotal
            </div>
            <div className="text-wrapper-5 flex items-center justify-center">
              {moneda}
              {subtotal.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
