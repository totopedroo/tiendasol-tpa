/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/joy";
import {
  getNotificacionesUsuario,
  marcarNotificacionComoLeida,
} from "../../service/notificacionesService";
import { NotificacionItem } from "./NotificacionItem";
import { Button } from "../button/Button";
import "./Notificaciones.css";

export const Notificaciones = ({ userId, onClose }) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotificaciones = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await getNotificacionesUsuario(userId, {
        limit: 20,
        leidas: false, // Solo notificaciones sin leer
      });
      setNotificaciones(response.data || []);
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
      // Marcar como leída al hacer clic
      if (!notificacion.leida) {
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
      <div className="notificaciones-header flex justify-between items-center">
        <h2 className="notificaciones-titulo">Notificaciones</h2>
        <div className="notificaciones-header-acciones flex items-center gap-3">
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
          <div className="notificaciones-loading flex items-center justify-center">
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
          <div className="notificaciones-error flex items-center justify-center">
            {error}
          </div>
        )}

        {!loading && !error && notificaciones.length === 0 && (
          <div className="notificaciones-vacio flex items-center justify-center">
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
