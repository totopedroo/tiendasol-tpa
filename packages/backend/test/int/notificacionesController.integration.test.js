import request from "supertest";
import { describe, it, beforeEach, expect, jest } from "@jest/globals";

import { buildTestServer } from "./utils/buildTestServer.js";
import notificacionesRoutes from "../../routes/notificacionesRoutes.js";
import { NotificacionesController } from "../../controllers/notificacionesController.js";

describe("NotificacionesController (integration)", () => {
  let server;
  let app;
  let mockService;
  let controller;

  const validUserId = "66ff4b379a2e4b2b5c9f89f2"; // 24 hex para pasar la validación Zod
  const validNotifId = "66ff4c6a9a2e4b2b5c9f8a01";

  beforeEach(() => {
    mockService = {
      obtenerNoLeidas: jest.fn(),
      obtenerLeidas: jest.fn(),
      marcarLeida: jest.fn(),
    };

    controller = new NotificacionesController(mockService);

    server = buildTestServer();
    server.addRoute(notificacionesRoutes);
    server.setControllers(NotificacionesController, controller);
    server.configureRoutes();

    app = server.app || server.getApp?.() || server;
  });

  it("GET /users/:userId/notificaciones/sin-leer devuelve 200 y llama al service con {limit, afterId}", async () => {
    const afterId = "66ff4d7a9a2e4b2b5c9f8b02";
    const data = [
      { _id: "n1", usuarioDestino: validUserId, mensaje: "hola", leida: false },
      { _id: "n2", usuarioDestino: validUserId, mensaje: "chau", leida: false },
    ];
    mockService.obtenerNoLeidas.mockResolvedValue(data);

    const res = await request(app)
      .get(`/users/${validUserId}/notificaciones/sin-leer?limit=2&afterId=${afterId}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(mockService.obtenerNoLeidas).toHaveBeenCalledWith(validUserId, {
      limit: 2,
      afterId,
    });
  });

  it("GET /users/:userId/notificaciones/leidas devuelve 200 y llama al service", async () => {
    const data = [{ _id: "n3", usuarioDestino: validUserId, mensaje: "ok", leida: true }];
    mockService.obtenerLeidas.mockResolvedValue(data);

    const res = await request(app)
      .get(`/users/${validUserId}/notificaciones/leidas?limit=1`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(mockService.obtenerLeidas).toHaveBeenCalledWith(validUserId, {
      limit: 1,
      afterId: null, // por defecto en el controller tras el safeParse
    });
  });

  it("PATCH /users/:userId/notificaciones/:id/marcar-leida devuelve 200 y llama al service", async () => {
    const updated = { _id: validNotifId, usuarioDestino: validUserId, leida: true, fechaLeida: new Date().toISOString() };
    mockService.marcarLeida.mockResolvedValue(updated);

    const res = await request(app)
      .patch(`/users/${validUserId}/notificaciones/${validNotifId}/marcar-leida`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ _id: validNotifId, leida: true });
    expect(mockService.marcarLeida).toHaveBeenCalledWith(validUserId, validNotifId);
  });

  it("GET /users/:userId/notificaciones/sin-leer con userId inválido → 400", async () => {
    const res = await request(app)
    .get(`/users/INVALID/notificaciones/sin-leer`);

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
    status: "fail",
    message: "Parámetros inválidos",
    });
  });

  it("PATCH /users/:userId/notificaciones/:id/marcar-leida → 404 cuando el service devuelve null", async () => {
    // el service indica que no encontró la notificación o ya estaba leída
    mockService.marcarLeida.mockResolvedValue(null);

    const res = await request(app)
    .patch(`/users/${validUserId}/notificaciones/${validNotifId}/marcar-leida`);

    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({
    status: "fail",
    message: "Notificación no encontrada o ya leída",
    });
  });

it("PATCH /users/:userId/notificaciones/:id/marcar-leida → 400 si el id no es ObjectId", async () => {
    const res = await request(app)
    .patch(`/users/${validUserId}/notificaciones/INVALID/marcar-leida`);

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
    status: "fail",
    message: "IDs inválidos",
    });
  });
});
