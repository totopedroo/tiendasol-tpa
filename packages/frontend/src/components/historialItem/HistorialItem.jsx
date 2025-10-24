import React from "react";
import "./HistorialItem.css";

export const HistorialItem = () => {
  return (
    <div className="historial-item-container">
      <div className="rectangle" />

      <div className="item-details">
        <div className="item-title-price">
          <div className="text-wrapper-3">Lorem Ipsum</div>

          <div className="text-wrapper-4">$150.000</div>
        </div>

        <div className="item-summary">
          <div className="text-wrapper-5">Cantidad: 2</div>

          <div className="text-wrapper-6">Subtotal: $300.000</div>
        </div>
      </div>
    </div>
  );
};
