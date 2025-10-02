import { ProductoController } from "../controllers/productoController.js";
import express from 'express'

const pathProducto = "/producto"

export default function productoRoutes(getController) {
    const router = express.Router()

    router.get(pathProducto, (req,res) =>{ // al PATH agregar el vendedor (pensarlo) - ahora funciona como query param: ?=idVendedor
        getController(ProductoController).findByVendedor(req,res)
    })

    return router;
}