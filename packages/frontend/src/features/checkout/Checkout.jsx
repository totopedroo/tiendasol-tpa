import React from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { ArrowLeft } from "../../components/icons/ArrowLeft";
import { CheckoutItem } from "../../components/checkoutItem/CheckoutItem";
import { Edit } from "../../components/icons/Edit";
import { Button } from "../../components/button/Button";
import { useCarrito } from "../../context/CarritoContext";
import { crearPedido } from "../../service/pedidosService";

export const Checkout = () => {
  const navigate = useNavigate();
  const { carritoItems, obtenerTotalItems, obtenerPrecioTotal, vaciarCarrito } =
    useCarrito();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRealizarPedido = async () => {
    try {
      // Preparar los items del pedido
      const items = carritoItems.map((item) => ({
        producto: item._id,
        cantidad: item.cantidad,
        precioUnitario: item.precio,
        moneda: item.moneda || "PESO_ARG",
      }));

      // Crear el objeto del pedido según el schema del backend
      const pedidoData = {
        moneda: "PESO_ARG", // O la moneda que uses en tu app
        id_comprador: 1, // Deberías obtener esto del usuario logueado
        direccionEntrega: {
          calle: "Calle Verdadera",
          altura: "1234",
          piso: "",
          departamento: "",
          codigoPostal: "5000",
          ciudad: "Córdoba",
          provincia: "Córdoba",
          pais: "Argentina",
        },
        items: items,
      };

      const pedido = await crearPedido(pedidoData);
      console.log("Pedido creado:", pedido);

      alert("Pedido realizado con éxito!");
      vaciarCarrito();
      navigate("/");
    } catch (error) {
      console.error("Error al realizar el pedido:", error);
      alert("Error al realizar el pedido. Por favor intenta nuevamente.");
    }
  };

  const limpiarCarrito = () => {
    vaciarCarrito();
  };

  return (
    <div className="checkout-screen flex flex-col items-center">
      <div className="container">
        <div className="checkout-container flex flex-col items-stretch flex-1">
          <div className="titulo flex items-center justify-between">
            <div className="text-wrapper flex items-center justify-center">
              Carrito
            </div>

            <div
              className="back-button-container flex items-center justify-center"
              onClick={handleGoBack}
              style={{ cursor: "pointer" }}
            >
              <ArrowLeft />
              <div className="back-button-text">Volver atrás</div>
            </div>
          </div>

          <div className="checkout-contenido flex items-center">
            <div className="pedido">
              {carritoItems.length === 0 ? (
                <div className="empty-cart">
                  <p>Tu carrito está vacío</p>
                  <Button variant="primary" onClick={() => navigate("/search")}>
                    Ver productos
                  </Button>
                </div>
              ) : (
                <>
                  {carritoItems.map((item) => (
                    <CheckoutItem key={item._id} item={item} />
                  ))}

                  <Button
                    variant="danger"
                    onClick={limpiarCarrito}
                    disabled={carritoItems.length === 0}
                  >
                    Limpiar carrito
                  </Button>
                </>
              )}
            </div>
            <div className="info-pedido flex flex-col items-center">
              <div className="detalle-pedido flex flex-col items-center">
                <div className="direccion-entrega-row flex items-center justify-between">
                  <div className="text-wrapper">Dirección de entrega</div>

                  <div className="direccion-entrega-info flex items-center justify-center">
                    <div className="text-wrapper-2">Calle Verdadera 1234</div>

                    <Edit style={{ cursor: "pointer" }} />
                  </div>
                </div>

                <div className="articulos-count-row flex items-center justify-between">
                  <div className="text-wrapper">Articulos</div>

                  <div className="text-wrapper-2">{obtenerTotalItems()}</div>
                </div>

                <div className="total-row flex items-center justify-between">
                  <div className="text-wrapper-3">Total</div>

                  <div className="text-wrapper-3">
                    ${obtenerPrecioTotal().toLocaleString()}
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                fullWidth
                size="large"
                onClick={handleRealizarPedido}
                disabled={carritoItems.length === 0}
              >
                Realizar Pedido
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
