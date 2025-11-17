import { UsuarioController } from "../controllers/usuarioController.js";
import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";

const pathUsuario = "/usuarios";

export default function usuarioRoutes(getController) {
  const router = express.Router();

  router.get(pathUsuario, (req, res, next) => {
    getController(UsuarioController).findAll(req, res, next);
  });

  router.get(pathUsuario + "/:id", (req, res, next) => {
    getController(UsuarioController).findById(req, res, next);
  });

  router.post(pathUsuario, (req, res, next) => {
    getController(UsuarioController).create(req, res, next);
  });

  router.put(pathUsuario + "/:id", verifyToken, (req, res, next) => {
    getController(UsuarioController).update(req, res, next);
  });

  router.delete(pathUsuario + "/:id", verifyToken, (req, res, next) => {
    getController(UsuarioController).delete(req, res, next);
  });
  return router;
}
