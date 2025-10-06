import { ProductoController } from "../controllers/productoController.js";
import express from 'express'

const pathProducto = "/productos"

export default function productoRoutes(getController) {
    const router = express.Router()

    router.get(pathProducto, (req,res,next) =>{ // al PATH agregar el vendedor (pensarlo) - ahora funciona como query param: ?=idVendedor
        getController(ProductoController).findAll(req,res,next)
    })

    router.get(pathProducto + "/:id", (req,res,next) =>{ 
        getController(ProductoController).findById(req,res,next)
    })

    router.post(pathProducto, (req,res,next) =>{ 
        getController(ProductoController).create(req,res,next)
    })

    router.put(pathProducto + "/:id", (req,res,next) =>{ 
        getController(ProductoController).update(req,res,next)
    })

    router.delete(pathProducto + "/:id", (req,res,next) =>{ 
        getController(ProductoController).delete(req,res,next)
    })
    return router;
}