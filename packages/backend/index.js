import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { Server } from "./server.js";

import routes from "./routes/routes.js";

// NOTIFICACIONES
import { NotificacionesRepository } from "./models/repositories/notificacionesRepository.js";
import { NotificacionesService } from "./services/notificacionesService.js";
import { NotificacionesController } from "./controllers/notificacionesController.js";
import { NotificacionesPublisher } from "./adapters/notificacionesPublisher.js";
// PEDIDOS
import { PedidosController } from "./controllers/pedidosController.js";
import { PedidosService } from "./services/pedidosService.js";
import { PedidosRepository } from "./models/repositories/pedidosRepository.js";
import { ProductoController } from "./controllers/productoController.js";
import { ProductoService } from "./services/productoService.js";
import { ProductoRepository } from "./models/repositories/productoRepository.js";
import { MongoDBClient } from "./config/database.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
      : true,
  }),
);

const port = process.env.SERVER_PORT || 3000;
const server = new Server(app, port);

await MongoDBClient.connect();

const notiRepository = new NotificacionesRepository();
const notiService = new NotificacionesService(notiRepository);
const notiController = new NotificacionesController(notiService);
const notiPublisher = new NotificacionesPublisher(notiService);
server.setControllers(NotificacionesController, notiController);

const pedidosRepository = new PedidosRepository();
const pedidosService = new PedidosService(pedidosRepository, notiPublisher);
const pedidosController = new PedidosController(pedidosService);
const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);
const productoController = new ProductoController(productoService);

server.setControllers(PedidosController, pedidosController);
server.setControllers(ProductoController, productoController);

routes.forEach((route) => server.addRoute(route));
server.configureRoutes();
server.launch();

export default app;
