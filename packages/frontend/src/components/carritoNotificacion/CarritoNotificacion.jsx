/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import "./CarritoNotificacion.css";

export const CarritoNotificacion = ({ producto, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto cerrar después de 5 segundos
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleIrAlCarrito = () => {
    navigate("/checkout");
    onClose();
  };

  const formatearPrecio = (precio, moneda) => {
    const simbolo = (() => {
      switch (moneda) {
        case "PESO_ARG":
          return "$";
        case "DOLAR":
          return "US$";
        case "REAL":
          return "R$";
        default:
          return "$";
      }
    })();
    return `${simbolo}${precio.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="carrito-notificacion">
      <Button
        variant="close"
        onClick={onClose}
        aria-label="Cerrar"
        className="cerrar-notif-btn-position"
      >
        ×
      </Button>

      <div className="notif-check">✓</div>
      <h3 className="notif-titulo">Agregado al carrito</h3>

      <div className="notif-producto">
        {producto.imagenes && producto.imagenes[0] && (
          <img
            src={producto.imagenes[0]}
            alt={producto.titulo}
            className="notif-imagen"
          />
        )}
        <div className="notif-detalles">
          <p className="notif-nombre">{producto.titulo}</p>
          <p className="notif-precio">
            {formatearPrecio(producto.precio, producto.moneda)}
          </p>
        </div>
      </div>

      <Button
        variant="primary"
        size="medium"
        fullWidth={true}
        onClick={handleIrAlCarrito}
      >
        Ir al carrito
      </Button>
    </div>
  );
};
