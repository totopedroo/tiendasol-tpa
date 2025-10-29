import { CategoriaController } from "../controllers/categoriaController.js";
import express from 'express';

const pathCategoria = "/categorias";

export default function categoriaRoutes(getController) {
    const router = express.Router();

    router.get(pathCategoria, (req, res, next) => {
        getController(CategoriaController).findAll(req, res, next);
    });

    router.get(pathCategoria + "/:id", (req, res, next) => {
        getController(CategoriaController).findById(req, res, next);
    });

    router.post(pathCategoria, (req, res, next) => {
        getController(CategoriaController).create(req, res, next);
    });

    router.put(pathCategoria + "/:id", (req, res, next) => {
        getController(CategoriaController).update(req, res, next);
    });

    router.delete(pathCategoria + "/:id", (req, res, next) => {
        getController(CategoriaController).delete(req, res, next);
    });

    return router;
}

