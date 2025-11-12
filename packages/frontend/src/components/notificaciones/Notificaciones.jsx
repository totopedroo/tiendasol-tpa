/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/joy";
import {
  getNotificacionesUsuario,
  marcarNotificacionComoLeida,
} from "../../service/notificacionesService";
import { NotificacionItem } from "./NotificacionItem";
import { notificacionesMock } from "../../mockdata/Notificaciones";
import { Button } from "../button/Button";
import "./Notificaciones.css";

const USE_MOCK = true; // Cambiar a false para usar el backend real

export const Notificaciones = ({ userId, onClose }) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotificaciones = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);
    try {
      if (USE_MOCK) {
        // Simular delay de red
        await new Promise((resolve) => setTimeout(resolve, 500));
        setNotificaciones(notificacionesMock.data || []);
      } else {
        const response = await getNotificacionesUsuario(userId, {
          limit: 20,
          leidas: false, // Solo notificaciones sin leer
        });
        setNotificaciones(response.data || []);
      }
    } catch (err) {
      console.error("Error al cargar notificaciones:", err);
      setError("Error al cargar las notificaciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotificaciones();
  }, [userId]);

  const handleVerDetalle = async (notificacion) => {
    try {
      // Marcar como leída al hacer clic (solo si no estamos usando mock)
      if (!USE_MOCK && !notificacion.leida) {
        await marcarNotificacionComoLeida(userId, notificacion._id);
      }
    } catch (err) {
      console.error("Error al marcar notificación como leída:", err);
    } finally {
      // Siempre cerrar el menú, incluso si hay error
      onClose();
    }
  };

  return (
    <div className="notificaciones-panel">
      <div className="notificaciones-header">
        <h2 className="notificaciones-titulo">Notificaciones</h2>
        <div className="notificaciones-header-acciones">
          <Button
            variant="close"
            onClick={onClose}
            aria-label="Cerrar notificaciones"
          >
            ×
          </Button>
        </div>
      </div>

      <div className="notificaciones-lista">
        {loading && (
          <div className="notificaciones-loading">
            <CircularProgress
              size="lg"
              sx={{
                "--CircularProgress-progressColor": "#000",
                color: "#000",
              }}
            />
          </div>
        )}

        {error && <div className="notificaciones-error">{error}</div>}

        {!loading && !error && notificaciones.length === 0 && (
          <div className="notificaciones-vacio">
            No tienes notificaciones nuevas
          </div>
        )}

        {!loading &&
          !error &&
          notificaciones.map((notif) => (
            <NotificacionItem
              key={notif._id}
              notificacion={notif}
              userId={userId}
              onVerDetalle={handleVerDetalle}
            />
          ))}
      </div>
    </div>
  );
};
