import { describe, it, expect } from "@jest/globals";
import { Notificacion } from "../../models/entities/notificacion.js";
import { FactoryNotificacion } from "../../models/entities/factoryNotificacion.js";
import { ESTADO_PEDIDO } from "../../models/entities/estadoPedido.js";

function fakePedidoBase(overrides = {}) {
  return {
    estado: ESTADO_PEDIDO.CONFIRMADO,
    comprador: { _id: "comprador1", nombre: "Comprador" },
    items: [
      {
        producto: {
          nombre: "Producto A",
          vendedor: { _id: "vendedor1", nombre: "Vendedor" },
        },
        cantidad: 2,
      },
    ],
    total: 123.45,
    direccionEntrega: {
      calle: "Siempreviva",
      altura: "742",
      ciudad: "CABA",
      provincia: "Buenos Aires",
      pais: "AR",
      codigoPostal: "1405",
      latitud: -34.603722,
      longitud: -58.381592,
    },
    ...overrides,
  };
}

describe("Notificacion (dominio)", () => {
  it("marcarComoLeida setea flags y es idempotente", () => {
    const n = new Notificacion({ _id: "u1" }, "msg");
    expect(n.leida).toBe(false);
    expect(n.fechaLeida).toBeNull();

    n.marcarComoLeida();
    expect(n.leida).toBe(true);
    expect(n.fechaLeida).toBeInstanceOf(Date);

    const prev = n.fechaLeida;
    n.marcarComoLeida(); // segunda vez, no cambia
    expect(n.fechaLeida).toEqual(prev);
  });
});

describe("FactoryNotificacion", () => {
  const factory = new FactoryNotificacion();

  it("crearSegunEstadoPedido devuelve 'Pedido <ESTADO>'", () => {
    expect(factory.crearSegunEstadoPedido(ESTADO_PEDIDO.ENVIADO))
      .toBe("Pedido ENVIADO");
  });

  it("crearSegunPedido (CONFIRMADO): receptor = vendedor y mensaje completo", () => {
    const pedido = fakePedidoBase({ estado: ESTADO_PEDIDO.CONFIRMADO });

    const noti = factory.crearSegunPedido(pedido);

    expect(noti).toBeInstanceOf(Notificacion);
    expect(noti.usuarioDestino?._id ?? noti.usuarioDestino).toBe("vendedor1");
    expect(noti.mensaje).toContain("Pedido CONFIRMADO por Comprador");
    expect(noti.mensaje).toContain("Producto A - 2");
    expect(noti.mensaje).toContain("Total: 123.45");
    expect(noti.mensaje).toContain("Siempreviva");
    expect(noti.mensaje).toMatch(/\(-34\.6037\d*, -58\.3815\d*\)/);
  });

  it("crearSegunPedido (ENVIADO): receptor = comprador y 'por Vendedor'", () => {
    const pedido = fakePedidoBase({ estado: ESTADO_PEDIDO.ENVIADO });

    const noti = factory.crearSegunPedido(pedido);

    expect(noti.usuarioDestino?._id ?? noti.usuarioDestino).toBe("comprador1");
    expect(noti.mensaje).toContain("Pedido ENVIADO por Vendedor");
  });

  it("crearSegunPedido sin direccionEntrega no imprime [object Object]", () => {
    const pedido = fakePedidoBase({ direccionEntrega: undefined });
    const noti = factory.crearSegunPedido(pedido);

    expect(noti.mensaje).toContain("Dirección de entrega:");
    expect(noti.mensaje).not.toContain("[object Object]");
  });
});
