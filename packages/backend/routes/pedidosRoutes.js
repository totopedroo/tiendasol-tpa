import { PedidosController } from "../controllers/pedidosController.js";
import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";

const pathPedidos = "/pedidos";

export default function pedidosRoutes(getController) {
  const router = express.Router();

  // Creación de un pedido, validando el stock disponible de cada producto.
  router.post(pathPedidos, (req, res, next) => {
    getController(PedidosController).crear(req, res, next);
  });

  // Consulta del historial de pedidos de un usuario.
  // /pedidos?userId=xxx
  router.get(pathPedidos, verifyToken ,(req, res, next) => {
    getController(PedidosController).historialDelUsuario(req, res, next);
  });

  // Cancelación de un pedido antes de que haya sido enviado.
  // Marcado de un pedido como enviado por parte del vendedor.
  // Marcado de un pedido como confirmado por parte del vendedor.
  // ? para el cancelado: método post (marcar como cancelado) o delete?
  router.patch(pathPedidos + "/:id", (req, res, next) => {
    getController(PedidosController).cambiarEstado(req, res, next);
  });

  return router;
}
