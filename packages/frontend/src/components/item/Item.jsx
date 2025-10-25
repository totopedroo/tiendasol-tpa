import React from "react";
import { ShoppingCart } from "../icons/ShoppingCart";
import "./Item.css";

export const Item = () => {
  return (
    <div className="item">
      <div className="imagen-item" />
      <div className="item-content">
        <div className="item-info">
          <div className="text-wrapper">Vendedor</div>
          <div className="text-wrapper-2">Lorem Ipsum</div>
          <div className="text-wrapper-3">$150.000</div>
        </div>

        <div className="add-to-cart-button">
          <ShoppingCart />
          <div className="text-wrapper-4">Agregar al carrito</div>
        </div>
      </div>
    </div>
  );
};
