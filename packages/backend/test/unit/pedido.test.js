import { ESTADO_PEDIDO } from "../../models/entities/estadoPedido";
import { ItemPedido } from "../../models/entities/itemPedido";
import { MONEDA } from "../../models/entities/moneda";
import { Pedido } from "../../models/entities/pedido";
import { Producto } from "../../models/entities/producto";
import { TIPO_USUARIO } from "../../models/entities/tipoUsuario";
import { Usuario } from "../../models/entities/usuario";
import { DireccionEntrega } from "../../models/entities/direccionEntrega";

describe("Pedido", () => {
  const mockComprador = new Usuario({
    id: 1,
    nombre: "Santino",
    email: "sa@gmail.com",
    telefono: "123456789",
    tipo: TIPO_USUARIO.COMPRADOR,
    fechaAlta: new Date(),
  });

  const mockDirEntrega = new DireccionEntrega(
    "Av. Siempreviva",
    742,
    null,
    null,
    "1900",
    "La Plata",
    "Buenos Aires",
    "Argentina",
    -34.921,
    -57.954
  );

  const pedidoBase = () => {
    return new Pedido(mockComprador, MONEDA.PESO_ARG, mockDirEntrega, []);
  };

  describe("Pedido.validarStock", () => {
    const mockVendedor = new Usuario({
      id: 2,
      nombre: "Fabrizio",
      email: "fa@gmail.com",
      telefono: "987654321",
      tipo: TIPO_USUARIO.VENDEDOR,
      fechaAlta: new Date(),
    });

    const producto = new Producto(
      mockVendedor,
      "Tostadora",
      "Tuesta pan",
      100,
      MONEDA.PESO_ARG,
      true
    );

    const producto2 = new Producto(
      mockVendedor,
      "Sartén",
      "Para cocinar patys",
      25,
      MONEDA.PESO_ARG,
      true
    );

    producto.aumentarStock(3);
    producto2.aumentarStock(10);

    test("Hay stock disponible para todos los productos", () => {
      const pedido = pedidoBase();

      const item1 = new ItemPedido(producto, 1);
      const item2 = new ItemPedido(producto2, 3);

      pedido.agregarItem(item1);
      pedido.agregarItem(item2);

      expect(pedido.validarStock()).toBe(true);
    });

    test("Hay stock disponible para solo un producto", () => {
      const pedido = pedidoBase();

      const item1 = new ItemPedido(producto, 4);
      const item2 = new ItemPedido(producto2, 9);

      pedido.agregarItem(item1);
      pedido.agregarItem(item2);

      expect(pedido.validarStock()).toBe(false);
    });

    test("No hay stock disponible para ningún producto", () => {
      const pedido = pedidoBase();

      const item1 = new ItemPedido(producto, 4);
      const item2 = new ItemPedido(producto2, 15);

      pedido.agregarItem(item1);
      pedido.agregarItem(item2);

      expect(pedido.validarStock()).toBe(false);
    });
  });

  describe("Pedido.actualizarEstado", () => {
    test("El estado pasa de pendiente a cancelado", () => {
      const pedido = pedidoBase();
      expect(pedido.estado).toBe(ESTADO_PEDIDO.PENDIENTE);
      expect(pedido.historialEstados.length).toBe(0);

      pedido.actualizarEstado(
        ESTADO_PEDIDO.CANCELADO,
        mockComprador,
        "Ya no lo quiero"
      );
      expect(pedido.estado).toBe(ESTADO_PEDIDO.CANCELADO);
      expect(pedido.historialEstados.length).toBeGreaterThan(0); // Debería haber una entrada al historial
    });

    test("El estado pasa de pendiente a en preparación y despues a enviado", () => {
      const pedido = pedidoBase();
      expect(pedido.estado).toBe(ESTADO_PEDIDO.PENDIENTE);
      expect(pedido.historialEstados.length).toBe(0);

      pedido.actualizarEstado(
        ESTADO_PEDIDO.EN_PREPARACION,
        mockVendedor,
        "Pedido en preparación"
      );
      expect(pedido.estado).toBe(ESTADO_PEDIDO.EN_PREPARACION);
      expect(pedido.historialEstados.length).toBe(1); // Debería haber una entrada al historial

      pedido.actualizarEstado(
        ESTADO_PEDIDO.ENVIADO,
        mockVendedor,
        "Pedido enviado"
      );
      expect(pedido.estado).toBe(ESTADO_PEDIDO.ENVIADO);
      expect(pedido.historialEstados.length).toBe(2); // Deberían haber dos entradas al historial
    });
  });
});
