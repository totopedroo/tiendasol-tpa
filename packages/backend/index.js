import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { Server } from "./server.js";

import routes from "./routes/routes.js";

import { PedidosController } from "./controllers/pedidosController.js";
import { PedidosService } from "./services/pedidosService.js";
import { PedidosRepository } from "./models/repositories/pedidosRepository.js";
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

const pedidosRepository = new PedidosRepository();
const pedidosService = new PedidosService(pedidosRepository);
const pedidosController = new PedidosController(pedidosService);

server.setControllers(PedidosController, pedidosController);

routes.forEach((route) => server.addRoute(route));
server.configureRoutes();
server.launch();

MongoDBClient.connect();

export default app;
