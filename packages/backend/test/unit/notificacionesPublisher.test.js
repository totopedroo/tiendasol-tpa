import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { NotificacionesPublisher } from "../../adapters/notificacionesPublisher.js";
import { ESTADO_PEDIDO } from "../../models/entities/estadoPedido.js";

class StubFactory {
  constructor(payload) { this.payload = payload; }
  crearSegunPedido() { return this.payload; }
}

function fakePedido(overrides = {}) {
  return {
    _id: "pedido1",
    estado: ESTADO_PEDIDO.PENDIENTE,
    comprador: { _id: "comprador1", nombre: "Comprador" },
    items: [{
      producto: { nombre: "A", vendedor: { _id: "vendedor1", nombre: "Vendedor" } },
      cantidad: 1,
    }],
    total: 10,
    direccionEntrega: { calle: "Calle", altura: "123", ciudad: "CABA", provincia: "BA", pais: "AR" },
    ...overrides,
  };
}

describe("NotificacionesPublisher", () => {
  let notiService;

  beforeEach(() => {
    notiService = { agregar: jest.fn().mockResolvedValue({ _id: "n1" }) };
  });

  it("CONFIRMADO: agrega con tipo correcto y prefijo 'Confirmación de pedido'", async () => {
    const factory = new StubFactory({
      usuarioDestino: { _id: "vendedor1" },
      mensaje: "Pedido CONFIRMADO por Comprador",
    });
    const pub = new NotificacionesPublisher(notiService, factory);
    const cambio = { pedido: fakePedido(), estado: ESTADO_PEDIDO.CONFIRMADO, motivo: null };

    await pub.publicar(cambio);

    expect(notiService.agregar).toHaveBeenCalledTimes(1);
    const arg = notiService.agregar.mock.calls[0][0];

    expect(arg.usuarioDestino).toBe("vendedor1");
    expect(arg.pedido).toBe("pedido1");
    expect(arg.tipo).toBe(ESTADO_PEDIDO.CONFIRMADO);
    expect(arg.mensaje).toContain("Confirmación de pedido");
    expect(arg.mensaje).toContain("Pedido CONFIRMADO por Comprador");
  });

  it("CANCELADO: incluye 'Motivo:' y no muta el pedido original", async () => {
    const p = fakePedido();
    const factory = new StubFactory({
      usuarioDestino: { _id: "comprador1" },
      mensaje: "Pedido CANCELADO por Vendedor",
    });
    const pub = new NotificacionesPublisher(notiService, factory);
    const cambio = { pedido: p, estado: ESTADO_PEDIDO.CANCELADO, motivo: "Sin stock" };

    await pub.publicar(cambio);

    const arg = notiService.agregar.mock.calls[0][0];
    expect(arg.tipo).toBe(ESTADO_PEDIDO.CANCELADO);
    expect(arg.mensaje).toContain("Cancelación de pedido");
    expect(arg.mensaje).toContain("Motivo: Sin stock");
    expect(p.estado).toBe(ESTADO_PEDIDO.PENDIENTE); // publisher no muta
  });

  it("ENVIADO: etiqueta 'Aviso de pedido enviado' y sin Motivo", async () => {
    const factory = new StubFactory({
      usuarioDestino: "comprador1",
      mensaje: "Pedido ENVIADO por Vendedor",
    });
    const pub = new NotificacionesPublisher(notiService, factory);
    const cambio = { pedido: fakePedido(), estado: ESTADO_PEDIDO.ENVIADO };

    await pub.publicar(cambio);

    const arg = notiService.agregar.mock.calls[0][0];
    expect(arg.tipo).toBe(ESTADO_PEDIDO.ENVIADO);
    expect(arg.mensaje).toContain("Aviso de pedido enviado");
    expect(arg.mensaje).not.toContain("Motivo:");
  });
});
