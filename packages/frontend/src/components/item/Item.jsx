/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "../icons/ShoppingCart";
import { Button } from "../button/Button";
import { useCarrito } from "../../context/CarritoContext";
import { useAuth } from "../../context/AuthContexto.jsx";
import { ImageWithLoader } from "../imageWithLoader/ImageWithLoader";
import "./Item.css";

export const Item = ({ item }) => {
  const { agregarAlCarrito } = useCarrito();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault(); // Evita que el Link navegue

    if (!isAuthenticated) {
      openAuthModal("login");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simular delay
    agregarAlCarrito(item);
    setLoading(false);
  };

  return (
    <Link key={item._id} to={`/products/${item._id}`} className="item">
      <ImageWithLoader
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
                  return "U$D ";
                case "REAL":
                  return "R$ ";
                default:
                  return "$";
              }
            })()}
            {item.precio.toLocaleString()}
          </div>
        </div>

        <Button
          variant="secondary"
          icon={<ShoppingCart />}
          onClick={handleAddToCart}
          fullWidth
          loading={loading}
        >
          Agregar al carrito
        </Button>
      </div>
    </Link>
  );
};
