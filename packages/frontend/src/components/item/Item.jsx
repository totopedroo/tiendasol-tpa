/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "../icons/ShoppingCart";
import { Button } from "../button/Button";
import { useCarrito } from "../../context/CarritoContext";
import "./Item.css";

export const Item = ({ item }) => {
  const { agregarAlCarrito, estaEnCarrito } = useCarrito();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Evita que el Link navegue
    agregarAlCarrito(item);
  };

  return (
    <Link key={item._id} to={`/products/${item._id}`} className="item">
      <img
        src={item.fotos?.[0] || "/images/logo.png"}
        alt={item.titulo || "Producto"}
        className="item-image"
      />

      <div className="item-content">
        <div className="item-info">
          <div>{item.vendedor?.nombre || "Vendedor"}</div>
          <div className="text-wrapper-2">{item.titulo}</div>
          <div className="text-wrapper-3">
            {(() => {
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
            })()}
            {item.precio}
          </div>
        </div>

        <Button
          variant={estaEnCarrito(item._id) ? "primary" : "secondary"}
          icon={<ShoppingCart />}
          onClick={handleAddToCart}
          fullWidth
        >
          {estaEnCarrito(item._id) ? "Agregar más" : "Agregar al carrito"}
        </Button>
      </div>
    </Link>
  );
};
