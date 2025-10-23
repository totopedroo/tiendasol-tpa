import React from "react";
import { ShoppingCart } from "../icons/ShoppingCart";
import "./Item.css"

export const Item = () => {
  return (
    <div className="item">
      <div className="rectangle" />

      <div className="frame">
        <div className="div">
          <div className="text-wrapper">Vendedor</div>
          <div className="text-wrapper-2">Lorem Ipsum</div>
          <div className="text-wrapper-3">$150.000</div>
        </div>

        <div className="frame-2">
          <ShoppingCart />
          <div className="text-wrapper-4">Agregar al carrito</div>
        </div>
      </div>
    </div>
  );
};
