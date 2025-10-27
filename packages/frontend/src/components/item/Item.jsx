/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "../icons/ShoppingCart";
import { Button } from "../button/Button";
import "./Item.css";

export const Item = ({ item }) => {
  const handleAddToCart = (e) => {
    e.preventDefault(); // Evita que el Link navegue
    alert("test");
  };

  return (
    <Link key={item.id} to={`/products/${item.id}`} className="item">
      <img
        src={item.fotos[0]}
        alt={item.titulo || "Producto"}
        className="item-image"
      />

      <div className="item-content">
        <div className="item-info">
          <div>{item.vendedor}</div>
          <div className="text-wrapper-2">{item.titulo}</div>
          <div className="text-wrapper-3">${item.precio}</div>
        </div>

        <Button
          variant="secondary"
          icon={<ShoppingCart />}
          onClick={handleAddToCart}
          fullWidth
        >
          <span className="button-text-full">Agregar al carrito</span>
          <span className="button-text-short">Agregar</span>
        </Button>
      </div>
    </Link>
  );
};
