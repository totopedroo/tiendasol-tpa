import { ProductoService } from "../../services/productoService.js";
import { describe, expect, jest } from "@jest/globals";
import { NotFoundError } from "../../error/appError.js";
import { Producto } from "../../models/entities/producto.js";
import { MONEDA } from "../../models/entities/moneda.js";
import { Usuario } from "../../models/entities/usuario.js";
import { TIPO_USUARIO } from "../../models/entities/tipoUsuario.js";

describe("ProductoService - findAll", () => {
  test("debe lanzar NotFoundError si no hay productos en la base de datos", async () => {
    const mockRepo = {
      findByPage: jest.fn().mockResolvedValue(null), // simulamos que no devuelve nada
      contarTodos: jest.fn(),
    };

    const service = new ProductoService(mockRepo);

    await expect(service.findAll(1, 10, {})).rejects.toThrow(NotFoundError);
    await expect(service.findAll(1, 10, {})).rejects.toThrow(
      "No hay ningún producto en la base de datos."
    );

    expect(mockRepo.findByPage).toHaveBeenCalledWith(1, 10, {});
    expect(mockRepo.contarTodos).not.toHaveBeenCalled(); // no debería contarlos si no hay productos
  });

  test("debe devolver los productos paginados correctamente", async () => {
    const vendedor = new Usuario("1", "Pedro", "pedro@gmail.com", "+54 9 11 5555-5555", TIPO_USUARIO.VENDEDOR, "2025-10-10");
    // el ID debería ser un OBJID pero para el test no modifica nada expresarlo así

    const mockProductos = [
      new Producto(vendedor, "Lapicera", "Tinta azul", 100, MONEDA.PESO_ARG, true),
      new Producto(vendedor, "Lápiz", "Punta HB", 80, MONEDA.PESO_ARG, true),
    ];

    const mockRepo = {
      findByPage: jest.fn().mockResolvedValue(mockProductos),
      contarTodos: jest.fn().mockResolvedValue(50),
    };

    const service = new ProductoService(mockRepo);

    const result = await service.findAll(1, 10, {});

    expect(mockRepo.findByPage).toHaveBeenCalledWith(1, 10, {});
    expect(mockRepo.contarTodos).toHaveBeenCalled();

    expect(result).toEqual({
      pagina: 1,
      perPage: 10,
      total: 50,
      totalPaginas: Math.ceil(50 / 10),
      data: mockProductos,
    });
  });
});
