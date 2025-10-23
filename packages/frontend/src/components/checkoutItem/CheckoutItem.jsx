import React from "react";
import { Minus } from "../icons/Minus";
import { Plus } from "../icons/Plus";
import { Delete } from "../icons/Delete";
import "./CheckoutItem.css";

export const CheckoutItem = () => {
  return (
    <div className="checkout-item">
      <div className="rectangle" />

      <div className="div">
        <div className="div-2">
          <div className="div-3">
            <div className="text-wrapper">Lorem Ipsum</div>
            <div className="text-wrapper-2">$150.000</div>
          </div>

          <Delete className="delete" />
        </div>

        <div className="div-4">
          <div className="div-5">
            <div className="text-wrapper-3">Cantidad</div>
            <div className="div-6">
              <Minus className="minus-instance" />
              <div className="div-wrapper">
                <div className="text-wrapper-4">2</div>
              </div>
              <Plus className="plus-instance" />
            </div>
          </div>

          <div className="div-7">
            <div className="text-wrapper-3">Subtotal</div>
            <div className="text-wrapper-5">$300.000</div>
          </div>
        </div>
      </div>
    </div>
  );
};
