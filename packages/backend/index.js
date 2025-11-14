import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import { Server } from "./server.js";

import routes from "./routes/routes.js";

// NOTIFICACIONES
import { NotificacionesPublisher } from "./adapters/notificacionesPublisher.js";
import { NotificacionesController } from "./controllers/notificacionesController.js";
import { NotificacionesRepository } from "./models/repositories/notificacionesRepository.js";
import { NotificacionesService } from "./services/notificacionesService.js";
// PEDIDOS
import { PedidosController } from "./controllers/pedidosController.js";
import { PedidosRepository } from "./models/repositories/pedidosRepository.js";
import { PedidosService } from "./services/pedidosService.js";
// PRODUCTOS
import { ProductoController } from "./controllers/productoController.js";
import { ProductoRepository } from "./models/repositories/productoRepository.js";
import { ProductoService } from "./services/productoService.js";
// CATEGORIAS
import { MongoDBClient } from "./config/database.js";
import { CategoriaController } from "./controllers/categoriaController.js";
import { CategoriaRepository } from "./models/repositories/categoriaRepositoty.js";
import { CategoriaService } from "./services/categoriaService.js";
// USUARIOS
import { UsuarioController } from "./controllers/usuarioController.js";
import { UsuarioRepository } from "./models/repositories/usuarioRepository.js";
import { UsuarioService } from "./services/usuarioService.js";
// AUTH
import { AuthController } from "./controllers/authController.js";
import { authenticateUser } from "./services/authService.js"; // Importamos el servicio mock

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
      : true,
  })
);

const port = process.env.SERVER_PORT || 3000;
const server = new Server(app, port);

await MongoDBClient.connect();

const notiRepository = new NotificacionesRepository();
const notiService = new NotificacionesService(notiRepository);
const notiController = new NotificacionesController(notiService);
const notiPublisher = new NotificacionesPublisher(notiService);
server.setControllers(NotificacionesController, notiController);

const authController = new AuthController({ authenticateUser });
server.setControllers(AuthController, authController);

const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);
const productoController = new ProductoController(productoService);

const pedidosRepository = new PedidosRepository();
const pedidosService = new PedidosService(
  pedidosRepository,
  productoRepository,
  notiPublisher
);

const pedidosController = new PedidosController(pedidosService);
const usuarioRepository = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepository);
const usuarioController = new UsuarioController(usuarioService);

const categoriaRepository = new CategoriaRepository();
const categoriaService = new CategoriaService(categoriaRepository);
const categoriaController = new CategoriaController(categoriaService);

server.setControllers(PedidosController, pedidosController);
server.setControllers(ProductoController, productoController);
server.setControllers(UsuarioController, usuarioController);
server.setControllers(CategoriaController, categoriaController);

routes.forEach((route) => server.addRoute(route));
server.configureRoutes();
server.launch();

export default app;
