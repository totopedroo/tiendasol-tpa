import express from "express";
import { NotificacionesController } from "../controllers/notificacionesController.js";

const pathNoti = "/users/:userId/notificaciones";

export default function notificacionesRoutes(getController) {
  const router = express.Router();

  // Lista de NO leídas
  router.get(`${pathNoti}/sin-leer`, (req, res, next) => {
    getController(NotificacionesController).obtenerSinLeer(req, res, next);
  });

  // Lista de leídas
  router.get(`${pathNoti}/leidas`, (req, res, next) => {
    getController(NotificacionesController).obtenerLeidas(req, res, next);
  });

  // Marcar como leída
  router.patch(`${pathNoti}/:id/marcar-leida`, (req, res, next) => {
    getController(NotificacionesController).marcarComoLeida(req, res, next);
  });

  return router;
}
