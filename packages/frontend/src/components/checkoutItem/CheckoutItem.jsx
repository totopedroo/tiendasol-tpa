import React from "react";
import { Minus } from "../icons/Minus";
import { Plus } from "../icons/Plus";
import { Delete } from "../icons/Delete";
import { Button } from "../button/Button";
import "./CheckoutItem.css";

export const CheckoutItem = () => {
  return (
    <div className="checkout-item flex items-start">
      <div className="rectangle" />

      <div className="item-content flex flex-col items-center">
        <div className="item-header flex items-center justify-between">
          <div className="item-title-price flex flex-col items-center">
            <div className="text-wrapper">Lorem Ipsum</div>
            <div className="text-wrapper-2">$150.000</div>
          </div>

          <Delete className="delete" />
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
              />
              <div className="quantity-display">
                <div className="text-wrapper-4">2</div>
              </div>
              <Button
                variant="icon"
                icon={<Plus />}
                size="small"
                aria-label="Aumentar cantidad"
              />
            </div>
          </div>

          <div className="subtotal-section">
            <div className="text-wrapper-3">Subtotal</div>
            <div className="text-wrapper-5">$300.000</div>
          </div>
        </div>
      </div>
    </div>
  );
};
