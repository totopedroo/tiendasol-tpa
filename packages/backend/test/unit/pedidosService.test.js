import { Pedido } from "../../models/entities/pedido.js";
import { beforeEach, describe, jest } from "@jest/globals";
import { PedidosService } from "../../services/pedidosService.js";
import { Usuario } from "../../models/entities/usuario.js";
import { TIPO_USUARIO } from "../../models/entities/tipoUsuario.js";
import { DireccionEntrega } from "../../models/entities/direccionEntrega.js";
import { Producto } from "../../models/entities/producto.js";
import { MONEDA } from "../../models/entities/moneda.js";
import { ItemPedido } from "../../models/entities/itemPedido.js";

describe("PedidosService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockRepoPedidos = {
    create: jest.fn(),
  };

  const mockRepoProductos = {
    findByPage: jest.fn(),
  };

  const mockComprador = new Usuario({
    id: 1,
    nombre: "Santino",
    email: "sa@gmail.com",
    telefono: "123456789",
    tipo: TIPO_USUARIO.COMPRADOR,
    fechaAlta: new Date(),
  });

  const mockVendedor = new Usuario({
    id: 1,
    nombre: "Julian",
    email: "sa@gmail.com",
    telefono: "123456789",
    tipo: TIPO_USUARIO.VENDEDOR,
    fechaAlta: new Date(),
  });

  const mockDireccionEntrega = new DireccionEntrega(
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

  const pedidosService = () => {
    return new PedidosService(mockRepoPedidos);
  };

  describe("Requerimientos de la Gestión de Pedidos", () => {
    const productoConStock = new Producto(
      mockComprador,
      "Laptop Gamer",
      "Descripción de laptop",
      1500,
      MONEDA.DOLAR_USA,
      true
    );

    const productoSinStock = new Producto(
      mockVendedor,
      "Mousepad",
      "Descripción del mousepad...",
      20000,
      MONEDA.ARS,
      true
    );

    productoConStock.stock = 5; // el producto conStock tiene 5 unidades en stock
    productoSinStock.stock = 1; // el producto sinStock tiene 1 unidad en stock
    const itemConStock = new ItemPedido(productoConStock, 4); // el pedido incluye 5 unidades del producto con stock
    const itemSinStock = new ItemPedido(productoSinStock, 3); // el pedido incluye 3 unidades del producto sin stock

    test("Creación de pedido + verificación de stock OK", async () => {
      const pedidoConStockDATA = new Pedido(
        mockComprador,
        MONEDA.ARS,
        mockDireccionEntrega,
        [itemConStock]
      );

      // Llamamos el método del Serivce
      const service = pedidosService();
      await service.create(pedidoConStockDATA);

      // Verificamos:
      // El metodo create haya sido llamado solo una vez
      expect(mockRepoPedidos.create).toHaveBeenCalledTimes(1);
      // Que el pedido creado sea una instancia de Pedido
      // expect(pedidoCreado).toBeInstanceOf(Pedido);
      expect(pedidoConStockDATA.validarStock()).toBe(true);
    });

    test("Creación de pedido + verificación de stock - Sin Stock", async () => {
      const pedidoSinStockDATA = new Pedido(
        mockComprador,
        MONEDA.ARS,
        mockDireccionEntrega,
        [itemSinStock]
      );
      // Llamamos el método del Serivce
      const service = pedidosService();
      await expect(
        async () => await service.create(pedidoSinStockDATA)
      ).rejects.toThrow();
      // Verificamos:
      // El metodo create NO haya sido llamado
      expect(mockRepoPedidos.create).toHaveBeenCalledTimes(0);
      // Que haya dado falso el validarStock()
      expect(pedidoSinStockDATA.validarStock()).toBe(false);
    });
  });
});
