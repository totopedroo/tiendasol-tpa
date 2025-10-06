import express from "express";
import { Server } from "../../../server.js";
import { errorHandler } from "../../../middlewares/errorHandler.js";

export function buildTestServer() {
  const app = express();
  app.use(express.json());

  const server = new Server(app);
  const origConfigure = server.configureRoutes.bind(server);
  server.configureRoutes = () => {
    origConfigure();
    app.use(errorHandler);
  };

  return server;
}
