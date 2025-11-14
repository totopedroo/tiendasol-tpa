/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { ShoppingCart } from "../icons/ShoppingCart.jsx";
import { Button } from "../button/Button.jsx";
import { ImageWithLoader } from "../imageWithLoader/ImageWithLoader.jsx";
import "./ItemDetail.css";
import { useCarrito } from "../../context/CarritoContext";
import { useAuth } from "../../context/AuthContexto.jsx";

export const ItemDetail = ({ item }) => {
  // Hooks deben estar antes de cualquier return
  const [imagenSeleccionada, setImagenSeleccionada] = React.useState(0);
  const [cantidadSeleccionada, setCantidadSeleccionada] = React.useState(1);
  const { agregarAlCarrito } = useCarrito();
  const { isAuthenticated, openAuthModal } = useAuth();

  const handleAgregarAlCarrito = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      openAuthModal("login");
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    // Agregar la cantidad seleccionada veces
    for (let i = 0; i < cantidadSeleccionada; i++) {
      agregarAlCarrito(item);
    }
  };

  // Validar que item existe
  if (!item) {
    return (
      <div className="item-detail-loading">
        <p>Cargando producto...</p>
      </div>
    );
  }

  const hayStock = item.stock > 0;
  const fotos = item.fotos || [];
  const moneda = (() => {
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
  })();
  return (
    <div className="item-detail flex items-start">
      <div className="image-section">
        <div className="img-placeholder">
          <ImageWithLoader
            className="img"
            alt={item.titulo}
            src={
              fotos[imagenSeleccionada] ||
              "https://via.placeholder.com/480?text=Sin+Imagen"
            }
          />
        </div>

        {fotos.length > 1 && (
          <div className="image-thumbnails flex items-center gap-2">
            {fotos.map((foto, index) => (
              <div
                key={index}
                className={`thumbnail-placeholder ${index === imagenSeleccionada ? "active" : ""}`}
                onClick={() => setImagenSeleccionada(index)}
                style={{
                  backgroundImage: `url(${foto})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="product-info flex flex-col items-start">
        <div className="product-details flex flex-col items-start">
          <div className="text-wrapper flex items-center">
            {item.categorias.map((cat, index) => <>{cat.nombre}, </>)}
          </div>

          <div className="text-wrapper-2">{item.titulo}</div>

          <div className="text-wrapper-3">
            {moneda}
            {item.precio}
          </div>

          <p className="descripcion">{item.descripcion}</p>
        </div>

        <div className="product-actions flex items-center justify-end gap-4">
          {hayStock ? (
            <div className="quantity-wrapper flex items-center gap-2">
              <span className="quantity-label">Cantidad:</span>
              <select
                className="quantity-select"
                value={cantidadSeleccionada}
                onChange={(e) =>
                  setCantidadSeleccionada(Number(e.target.value))
                }
              >
                {Array.from({ length: Math.min(item.stock, 10) }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <span className="no-stock-message">No hay stock disponible</span>
          )}

          <Button variant="primary" disabled={!hayStock}>
            Comprar ahora
          </Button>

          <Button
            variant="secondary"
            disabled={!hayStock}
            icon={<ShoppingCart />}
            onClick={handleAgregarAlCarrito}
          >
            Agregar al carrito
          </Button>
        </div>
      </div>
    </div>
  );
};
