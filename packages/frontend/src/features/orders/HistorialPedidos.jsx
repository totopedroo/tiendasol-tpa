import React, { useEffect, useState } from "react";
import { User } from "../../components/icons/User";
import { Button } from "../../components/button/Button";
import Popup from "../../components/popups/PopUp";
import "./HistorialPedidos.css";
import { Paginacion } from "../../components/paginacion/Paginacion";
import { DetallePedido } from "../../components/detallePedido/DetallePedido";
import { getHistorialDeUsuario } from "../../service/pedidosService";
import {
  convertirAVendedor,
  convertirAComprador,
} from "../../service/usuariosService";
import { CircularProgress } from "@mui/joy";
import { useAuth } from "../../context/AuthContexto.jsx";

export const HistorialPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cambiandoTipo, setCambiandoTipo] = useState(false);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tituloPopup, setTituloPopup] = useState("");
  const [orden, setOrden] = useState("reciente");
  const [paginacion, setPaginacion] = useState({
    pagina: 1,
    perPage: 10,
    total: 0,
    totalPaginas: 0,
  });
  const { user, isAuthenticated, refreshUser } = useAuth();
  const nombreUsuario = user?.nombre || "Usuario";
  const tipoUsuario = user?.tipo || "Usuario";

  const fetchPedidos = async (pagina = 1, ordenamiento = orden) => {
    setLoading(true);
    setError(null);
    try {
      // Determinar el tipo de vista basado en el tipo de usuario
      const tipoVista = tipoUsuario === "VENDEDOR" ? "vendedor" : "comprador";
      const response = await getHistorialDeUsuario(
        user.id,
        tipoVista,
        pagina,
        5,
        ordenamiento
      );
      setPedidos(response?.data || []);
      setPaginacion({
        pagina: response.pagina || 1,
        perPage: response.perPage || 5,
        total: response.total || 0,
        totalPaginas: response.totalPaginas || 0,
      });
    } catch (error) {
      console.error(`Error al buscar pedidos de usuario ID ${user.id}:`, error);
      setError("Error al cargar los pedidos. Por favor, intenta de nuevo.");
      setPedidos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchPedidos();
    }
  }, [user.id, tipoUsuario]);

  const handleOrdenChange = (e) => {
    const nuevoOrden = e.target.value;
    setOrden(nuevoOrden);
    fetchPedidos(1, nuevoOrden);
  };

  const handlePaginaChange = (nuevaPagina) => {
    fetchPedidos(nuevaPagina, orden);
  };

  const handleCambiarTipo = async () => {
    setCambiandoTipo(true);
    try {
      const nuevoTipo = tipoUsuario === "VENDEDOR" ? "COMPRADOR" : "VENDEDOR";

      if (nuevoTipo === "VENDEDOR") {
        await convertirAVendedor(user.id);
      } else {
        await convertirAComprador(user.id);
      }

      // Actualizar el usuario en el contexto refrescando el token
      if (refreshUser) {
        await refreshUser();
      }

      setTituloPopup("¡Éxito!");
      setMensaje(
        `✅ Tu cuenta ha sido convertida a ${nuevoTipo.toLowerCase()}`
      );
      setMostrarPopup(true);
    } catch (error) {
      console.error("Error al cambiar tipo de cuenta:", error);
      setTituloPopup("Error");
      setMensaje(
        `⚠️ ${error.response?.data?.message || "Error al cambiar el tipo de cuenta. Intenta nuevamente."}`
      );
      setMostrarPopup(true);
    } finally {
      setCambiandoTipo(false);
    }
  };

  const handleClosePopup = () => {
    setMostrarPopup(false);
  };

  const handlePedidoActualizado = () => {
    // Recargar los pedidos después de cancelar
    fetchPedidos();
  };

  return (
    <div className="contenido">
      <div className="container">
        <div className="user-profile-section flex justify-between items-start gap-8">
          <div className="user-wrapper flex items-center justify-center">
            <User className="user-instance" />
          </div>

          <div className="user-info flex flex-col items-start justify-center self-stretch">
            <div className="text-wrapper flex items-center justify-center">
              {nombreUsuario}
            </div>

            <div className="text-wrapper-2 flex items-center justify-center">
              {tipoUsuario}
            </div>
          </div>

          <div className="cambiar-tipo-button flex items-center">
            <Button
              variant="secondary"
              size="medium"
              onClick={handleCambiarTipo}
              loading={cambiandoTipo}
            >
              Cambiar a {tipoUsuario === "VENDEDOR" ? "Comprador" : "Vendedor"}
            </Button>
          </div>
        </div>

        <div className="historial-screen flex flex-col items-stretch gap-4 w-full">
          <div className="container-titulo flex items-center justify-between w-full">
            <div className="titulo flex items-center justify-center">
              {tipoUsuario === "VENDEDOR"
                ? "Mis ventas"
                : "Historial de pedidos"}
            </div>

            <div className="container-paginacion flex items-center justify-end gap-6 flex-1">
              <select
                className="select"
                value={orden}
                onChange={handleOrdenChange}
              >
                <option value="reciente">Más reciente</option>
                <option value="antiguo">Más antiguo</option>
              </select>
              <Paginacion
                paginaActual={paginacion.pagina}
                totalPaginas={paginacion.totalPaginas}
                onCambioPagina={handlePaginaChange}
              />
            </div>
          </div>

          {loading && (
            <div className="loading-message flex items-center justify-center text-center">
              <CircularProgress
                size="lg"
                sx={{
                  "--CircularProgress-progressColor": "#000",
                  color: "#000",
                }}
              />
            </div>
          )}

          {error && (
            <div className="error-message flex items-center justify-center text-center">
              {error}
            </div>
          )}

          {!loading && !error && pedidos.length === 0 && (
            <div className="empty-message flex items-center justify-center text-center">
              {tipoUsuario === "VENDEDOR"
                ? "No hay ventas registradas."
                : "No hay pedidos en el historial."}
            </div>
          )}

          <div className="pedidos-list-container flex flex-col items-start gap-4 w-full">
            {!loading &&
              !error &&
              pedidos.map((pedido) => (
                <DetallePedido
                  key={pedido._id}
                  pedido={pedido}
                  onPedidoActualizado={handlePedidoActualizado}
                  esVendedor={tipoUsuario === "VENDEDOR"}
                  vendedorId={tipoUsuario === "VENDEDOR" ? user.id : null}
                />
              ))}
          </div>

          {!loading && !error && pedidos.length > 0 && (
            <div className="container-titulo flex items-center justify-between w-full">
              <div className="container-paginacion flex items-center justify-end gap-6 flex-1 self-stretch">
                <select
                  className="select"
                  value={orden}
                  onChange={handleOrdenChange}
                >
                  <option value="reciente">Más reciente</option>
                  <option value="antiguo">Más antiguo</option>
                </select>
                <Paginacion
                  paginaActual={paginacion.pagina}
                  totalPaginas={paginacion.totalPaginas}
                  onCambioPagina={handlePaginaChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <Popup
        title={tituloPopup}
        isOpen={mostrarPopup}
        onClose={handleClosePopup}
        mensaje={mensaje}
      />
    </div>
  );
};
