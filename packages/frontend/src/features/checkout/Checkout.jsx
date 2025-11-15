import React from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { ArrowLeft } from "../../components/icons/ArrowLeft";
import { CheckoutItem } from "../../components/checkoutItem/CheckoutItem";
import { Edit } from "../../components/icons/Edit";
import { Button } from "../../components/button/Button";
import { useCarrito } from "../../context/CarritoContext";
import { crearPedido } from "../../service/pedidosService";
import { set } from "mongoose";
import Popup from "../../components/popups/PopUp";
import { useState } from "react";
import { useAuth } from "../../context/AuthContexto";
import PopUpOpciones from "../../components/popups/PopUpOpciones";
import { ca } from "zod/locales";
import { updateUsuario } from "../../service/usuariosService";

export const Checkout = () => {
  const navigate = useNavigate();
  const { carritoItems, obtenerTotalItems, obtenerPrecioTotal, vaciarCarrito } =
    useCarrito();

  const handleGoBack = () => {
    navigate(-1);
  };

  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [mostrarPopUpOpciones, setMostrarPopUpOpciones] = useState(false);
  const [tituloOpciones, setTituloOpciones] = useState("");
  const [mensajeOpciones, setMensajeOpciones] = useState("");
  
  const { user } = useAuth();

  const handleClosePopup = () => {
    setMostrarPopup(false);
    if (titulo === "Pedido realizado") {
      navigate("/");
    }
  };

  const cambiarRol = async () => {
    try {
     await updateUsuario(user.id, {
        nombre: user.nombre,
        email: user.email,
        telefono: user.telefono,
        tipo: "COMPRADOR"
      });
      if (user) {
        user.tipo = "COMPRADOR";
      }
      // mostrar popup normal confirmando el cambio
      setTitulo("Rol cambiado");
      setMensaje("Su rol ha sido cambiado a COMPRADOR exitosamente.");
      setMostrarPopup(true);
    } catch (error) {
      console.error("Error al cambiar el rol:", error);
      setTitulo("Error al cambiar el rol");
      setMensaje("Hubo un error al cambiar el rol. Intente nuevamente.");
      setMostrarPopup(true);
    }
  };

   const handleRealizarPedido = async () => {
    try {
      // si el usuario es vendedor → mostrar popup para cambiar rol
      if (user.tipo === "VENDEDOR") {
        setTituloOpciones("Error al realizar el pedido");
        setMensajeOpciones(
          "Los usuarios con rol VENDEDOR no pueden realizar pedidos. ¿Desea cambiar su rol a COMPRADOR?"
        );
        setMostrarPopUpOpciones(true);
        return;
      }

      // crear pedido
      const items = carritoItems.map((item) => ({
        producto: item._id,
        cantidad: item.cantidad,
        precioUnitario: item.precio,
        moneda: item.moneda || "PESO_ARG",
      }));

      const pedidoData = {
        moneda: "PESO_ARG",
        id_comprador: user.id,
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

      await crearPedido(pedidoData);

      setTitulo("Pedido realizado");
      setMensaje("Tu pedido ha sido realizado con éxito ✅");
      setMostrarPopup(true);
      vaciarCarrito();

    } catch (error) {
      console.error("Error al realizar el pedido:", error);

      setTitulo("Error al realizar el pedido");
      setMensaje("Hubo un error. Intente nuevamente.");
      setMostrarPopup(true);
    }
  };

  const handlerCerrarCarrito = () => {
    setTituloOpciones("Vaciar carrito");
    setMensajeOpciones("¿Estás seguro de que quieres vaciar el carrito?");
    setMostrarPopUpOpciones(true);
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
              <div className="back-button-text">Seguir comprando</div>
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

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Button
                      variant="danger"
                      onClick={handlerCerrarCarrito}
                      disabled={carritoItems.length === 0}
                    >
                      Limpiar carrito
                    </Button>
                  </div>
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
      <Popup
          title={titulo}
          isOpen={mostrarPopup}
          onClose={handleClosePopup}
          mensaje={mensaje}
        />

        {/* 🟡 POPUP DE OPCIONES */}
        <PopUpOpciones
          title={tituloOpciones}
          mensaje={mensajeOpciones}
          isOpen={mostrarPopUpOpciones}
          onClose={() => setMostrarPopUpOpciones(false)}
          onConfirm={() => {
            if (tituloOpciones.includes("rol") || tituloOpciones.includes("pedido")) {
              setMostrarPopUpOpciones(false);
              cambiarRol();
              return;
            }
            vaciarCarrito();
            setMostrarPopUpOpciones(false);
          }}
        />
      </div>
    </div>
  );
};
