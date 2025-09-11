import { PedidosController } from "../controllers/pedidosController.js";
import express from "express";

const pathPedidos = "/pedidos";

export default function pedidosRoutes(getController) {
  const router = express.Router();

  // TODO armar los endpoints
  // Creación de un pedido, validando el stock disponible de cada producto.
  router.post(pathPedidos, (req, res) => {
    getController(PedidosController).crear(req, res);
  });

  // Consulta del historial de pedidos de un usuario.
  // /pedidos?userId=xxx
  router.get(pathPedidos, (req, res) => {
    getController(PedidosController).historialDelUsuario(req, res);
  });

  // Cancelación de un pedido antes de que haya sido enviado.
  // Marcado de un pedido como enviado por parte del vendedor.
  // ? para el cancelado: método post (marcar como cancelado) o delete?
  router.patch(pathPedidos + "/:id", (req, res) => {
    getController(PedidosController).cambiarEstado(req, res);
  });

  return router;
}
