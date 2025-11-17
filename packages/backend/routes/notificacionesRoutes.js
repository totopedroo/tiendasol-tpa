import express from "express";
import { NotificacionesController } from "../controllers/notificacionesController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const pathNoti = "/users/:userId/notificaciones";

export default function notificacionesRoutes(getController) {
  const router = express.Router();

  // unica lista (filtra por ?leidas=... o ?estado=...)
  router.get(pathNoti, verifyToken, (req, res, next) => {
    getController(NotificacionesController).listar(req, res, next);
  });

  // Marcar como leída
  router.patch(`${pathNoti}/:id/lectura`, verifyToken, (req, res, next) => {
    getController(NotificacionesController).marcarComoLeida(req, res, next);
  });

  return router;
}
