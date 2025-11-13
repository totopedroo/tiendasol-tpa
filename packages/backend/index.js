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
// PRODUCTOS
import { ProductoController } from "./controllers/productoController.js";
import { ProductoService } from "./services/productoService.js";
import { ProductoRepository } from "./models/repositories/productoRepository.js";
// CATEGORIAS
import { CategoriaController } from "./controllers/categoriaController.js";
import { CategoriaService } from "./services/categoriaService.js";
import { CategoriaRepository } from "./models/repositories/categoriaRepositoty.js";
import { MongoDBClient } from "./config/database.js";
// USUARIOS
import { UsuarioController } from "./controllers/usuarioController.js";
import { UsuarioService } from "./services/usuarioService.js";
import { UsuarioRepository } from "./models/repositories/usuarioRepository.js";
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


const authController = new AuthController({ authenticateUser });
server.setControllers(AuthController, authController);

const pedidosRepository = new PedidosRepository();
const pedidosService = new PedidosService(pedidosRepository, notiPublisher);
const pedidosController = new PedidosController(pedidosService);

const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);
const productoController = new ProductoController(productoService);

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
