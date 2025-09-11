import express from "express";

export class Server {
  #controllers = {};
  #app;
  #routes;

  constructor(app, port) {
    this.#app = app;
    this.port = port;
    this.#routes = [];
    this.#app.use(express.json());
  }

  getApp() {
    return this.#app;
  }

  setControllers(controllerClass, controller) {
    this.#controllers[controllerClass.name] = controller;
  }

  getController(controllerClass) {
    const controller = this.#controllers[controllerClass.name];
    if (!controller) {
      throw new Error("Controller missing for the given route.");
    }
    return controller;
  }

  addRoute(route) {
    this.#routes.push(route);
  }

  // le bindeamos la ruta a cada controlador
  configureRoutes() {
    this.#routes.forEach((route) =>
      this.#app.use(route(this.getController.bind(this))),
    );
  }

  launch() {
    this.#app.listen(this.port, () => {
      console.log(`Backend escuchando en puerto ${process.env.SERVER_PORT}`);
    });
  }
}
