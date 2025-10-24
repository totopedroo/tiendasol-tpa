import request from "supertest";
import { describe, it, beforeEach, expect, jest } from "@jest/globals";

import { buildTestServer } from "./utils/buildTestServer.js";
import notificacionesRoutes from "../../routes/notificacionesRoutes.js";
import { NotificacionesController } from "../../controllers/notificacionesController.js";

describe("NotificacionesController (integration) - endpoint unificado", () => {
  let server;
  let app;
  let mockService;
  let controller;

  const validUserId = "66ff4b379a2e4b2b5c9f89f2"; // 24 hex (ObjectId)
  const validNotifId = "66ff4c6a9a2e4b2b5c9f8a01";
  const afterId = "66ff4d7a9a2e4b2b5c9f8b02";

  beforeEach(() => {
    mockService = {
      listar: jest.fn(),
      marcarLeida: jest.fn(),
    };

    controller = new NotificacionesController(mockService);

    server = buildTestServer();
    server.addRoute(notificacionesRoutes);
    server.setControllers(NotificacionesController, controller);
    server.configureRoutes();

    app = server.app || server.getApp?.() || server;
  });

  it("GET /users/:userId/notificaciones (default = sin leer) devuelve 200 y llama a service.listar", async () => {
    const data = [
      { _id: "n1", usuarioDestino: validUserId, leida: false },
      { _id: "n2", usuarioDestino: validUserId, leida: false },
    ];
    mockService.listar.mockResolvedValue(data);

    const res = await request(app)
      .get(`/users/${validUserId}/notificaciones?limit=2&afterId=${afterId}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(mockService.listar).toHaveBeenCalledWith(validUserId, {
      limit: 2,
      afterId,
      leidas: false, // default
    });
  });

  it("GET /users/:userId/notificaciones?leidas=true devuelve 200", async () => {
    const data = [{ _id: "n3", usuarioDestino: validUserId, leida: true }];
    mockService.listar.mockResolvedValue(data);

    const res = await request(app)
      .get(`/users/${validUserId}/notificaciones?leidas=true&limit=1`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(mockService.listar).toHaveBeenCalledWith(validUserId, {
      limit: 1,
      afterId: null,
      leidas: true,
    });
  });

  it("GET /users/:userId/notificaciones?estado=leidas (alias) devuelve 200", async () => {
    const data = [{ _id: "n4", usuarioDestino: validUserId, leida: true }];
    mockService.listar.mockResolvedValue(data);

    const res = await request(app)
      .get(`/users/${validUserId}/notificaciones?estado=leidas&limit=1`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(mockService.listar).toHaveBeenCalledWith(validUserId, {
      limit: 1,
      afterId: null,
      leidas: true,
    });
  });

  it("GET /users/:userId/notificaciones con userId inválido → 400", async () => {
    const res = await request(app)
      .get(`/users/INVALID/notificaciones`);

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      status: "fail",
      message: "Parámetros inválidos",
    });
  });

  it("GET /users/:userId/notificaciones con filtros conflictivos (leidas y estado) → 400", async () => {
    const res = await request(app)
      .get(`/users/${validUserId}/notificaciones?leidas=true&estado=sin-leer`);

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      status: "fail",
      message: expect.stringContaining("Usá 'leidas' o 'estado'"),
    });
  });

  it("PATCH /users/:userId/notificaciones/:id/lectura devuelve 200 y llama al service", async () => {
    const updated = { _id: validNotifId, usuarioDestino: validUserId, leida: true };
    mockService.marcarLeida.mockResolvedValue(updated);

    const res = await request(app)
      .patch(`/users/${validUserId}/notificaciones/${validNotifId}/lectura`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ _id: validNotifId, leida: true });
    expect(mockService.marcarLeida).toHaveBeenCalledWith(validUserId, validNotifId);
  });

  it("PATCH /users/:userId/notificaciones/:id/lectura → 400 si el id no es ObjectId", async () => {
    const res = await request(app)
      .patch(`/users/${validUserId}/notificaciones/INVALID/lectura`);

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      status: "fail",
      message: "IDs inválidos",
    });
  });

  it("PATCH /users/:userId/notificaciones/:id/lectura → 404 cuando el service devuelve null", async () => {
    mockService.marcarLeida.mockResolvedValue(null);

    const res = await request(app)
      .patch(`/users/${validUserId}/notificaciones/${validNotifId}/lectura`);

    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({
      status: "fail",
      message: "Notificación no encontrada o ya leída",
    });
  });
});
