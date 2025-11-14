import React, { useEffect, useState } from "react";
import { User } from "../../components/icons/User";
import { Button } from "../../components/button/Button";
import Popup from "../../components/popups/PopUp";
import "./HistorialPedidos.css";
import { Paginacion } from "../../components/paginacion/Paginacion";
import { DetallePedido } from "../../components/detallePedido/DetallePedido";
import { getHistorialDeUsuario } from "../../service/pedidosService";
import { convertirAVendedor, convertirAComprador } from "../../service/usuariosService";
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
  const [paginacion, setPaginacion] = useState({
    pagina: 1,
    perPage: 10,
    total: 0,
    totalPaginas: 0,
  });
  const { user, isAuthenticated, refreshUser } = useAuth();
  const nombreUsuario = user?.nombre || "Usuario";
  const tipoUsuario = user?.tipo || "Usuario";

  const fetchPedidos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getHistorialDeUsuario(user.id);
      setPedidos(response || []);
      setPaginacion({
        pagina: response.pagina || 1,
        perPage: response.perPage || 10,
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
  }, [user.id]);

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
      setMensaje(`✅ Tu cuenta ha sido convertida a ${nuevoTipo.toLowerCase()}`);
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

  return (
    <div className="contenido">
      <div className="container">
        <div className="user-profile-section flex">
          <div className="user-wrapper">
            <User className="user-instance" />
          </div>

          <div className="user-info">
            <div className="text-wrapper">{nombreUsuario}</div>

            <div className="text-wrapper-2">{tipoUsuario}</div>
          </div>

          <div className="cambiar-tipo-button">
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

        <div className="historial-screen">
          <div className="container-titulo">
            <div className="titulo">Historial de pedidos</div>

            <div className="container-paginacion">
              <select>
                <option value="reciente">Más reciente</option>
                <option value="antiguo">Más antiguo</option>
              </select>
              <Paginacion />
            </div>
          </div>

          {loading && (
            <div className="loading-message">
              <CircularProgress
                size="lg"
                sx={{
                  "--CircularProgress-progressColor": "#000",
                  color: "#000",
                }}
              />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          {!loading && !error && pedidos.length === 0 && (
            <div className="empty-message">No hay pedidos en el historial.</div>
          )}

          <div className="pedidos-list-container">
            {!loading &&
              !error &&
              pedidos.map((pedido) => (
                <DetallePedido key={pedido._id} pedido={pedido} />
              ))}
          </div>

          {!loading && !error && pedidos.length > 0 && (
            <div className="container-titulo">
              <div className="container-paginacion">
                <select>
                  <option value="reciente">Más reciente</option>
                  <option value="antiguo">Más antiguo</option>
                </select>
                <Paginacion />
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
