import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "../icons/ShoppingCart";
import { Button } from "../button/Button";
import "./Item.css";

export const Item = () => {
  const handleAddToCart = (e) => {
    e.preventDefault(); // Evita que el Link navegue
    alert("test");
  };

  return (
    <Link to={`/products/1`} className="item">
      <div className="rectangle" />

      <div className="item-content">
        <div className="item-info">
          <div>Vendedor</div>
          <div className="text-wrapper-2">Lorem Ipsum</div>
          <div className="text-wrapper-3">$150.000</div>
        </div>

        <Button
          variant="secondary"
          icon={<ShoppingCart />}
          onClick={handleAddToCart}
          fullWidth
        >
          Agregar al carrito
        </Button>
      </div>
    </Link>
  );
};
