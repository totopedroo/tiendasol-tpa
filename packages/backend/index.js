import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Server } from "./server.js";

import routes from "./routes/routes.js";
import healthRoutes from "./routes/health.js";

import { PedidosController } from "./controllers/pedidosController.js";
import { PedidosService } from "./services/pedidosService.js";
import { PedidosRepository } from "./models/repositories/pedidosRepository.js";

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
dotenv.config();

const server = new Server(app, port);

const pedidosRepository = new PedidosRepository();
const pedidosService = new PedidosService(pedidosRepository);
const pedidosController = new PedidosController(pedidosService);

server.setControllers(PedidosController, pedidosController);

routes.forEach((route) => server.addRoute(route));
server.configureRoutes();
server.launch();

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use("/", healthRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API Tienda Sol",
    version: "1.0.0",
    endpoints: {
      "GET /health": "Informar estado del servidor",
    },
  });
});

app.use((err, req, res, next) => {
  console.error("Error no manejado:", err);
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
    error:
      process.env.NODE_ENV === "development" ? err.message : "Algo salió mal",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

export default app;
