import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { NotificacionesService } from "../../services/notificacionesService.js";

describe("NotificacionesService", () => {
  let repo;
  let service;

  beforeEach(() => {
    repo = {
      obtenerPorUsuario: jest.fn(),
      marcarComoLeida: jest.fn(),
      agregar: jest.fn(),
    };
    service = new NotificacionesService(repo);
  });

  it("obtenerNoLeidas llama al repo con leidas=false y respeta opts", async () => {
    const userId = "66ff4b379a2e4b2b5c9f89f2";
    const opts = { limit: 20, afterId: "66ff4c6a9a2e4b2b5c9f8a01" };
    const fake = [{ _id: "a" }, { _id: "b" }];
    repo.obtenerPorUsuario.mockResolvedValue(fake);

    const res = await service.obtenerNoLeidas(userId, opts);

    expect(repo.obtenerPorUsuario).toHaveBeenCalledWith(userId, {
      leidas: false,
      ...opts,
    });
    expect(res).toBe(fake);
  });

  it("obtenerLeidas llama al repo con leidas=true", async () => {
    const userId = "u1";
    repo.obtenerPorUsuario.mockResolvedValue([]);

    const res = await service.obtenerLeidas(userId, { limit: 5 });

    expect(repo.obtenerPorUsuario).toHaveBeenCalledWith(userId, {
      leidas: true,
      limit: 5,
    });
    expect(res).toEqual([]);
  });

  it("marcarLeida devuelve lo que devuelva el repo (incluido null)", async () => {
    const userId = "u1";
    const notifId = "n1";

    repo.marcarComoLeida.mockResolvedValue({ _id: notifId, leida: true });
    await expect(service.marcarLeida(userId, notifId))
      .resolves.toEqual({ _id: notifId, leida: true });

    repo.marcarComoLeida.mockResolvedValue(null);
    await expect(service.marcarLeida(userId, notifId))
      .resolves.toBeNull();
  });

  it("agregar delega en repo.agregar", async () => {
    const doc = { usuarioDestino: "u1", mensaje: "hola", tipo: "ENVIADO" };
    const saved = { _id: "x", ...doc };
    repo.agregar.mockResolvedValue(saved);

    const res = await service.agregar(doc);

    expect(repo.agregar).toHaveBeenCalledWith(doc);
    expect(res).toEqual(saved);
  });
});
