import request from "supertest";
import { buildTestServer } from "./utils/buildTestServer.js";
import { ProductoService } from "../../services/productoService.js";
import { ProductoController } from "../../controllers/productoController.js";
import productoRoutes from "../../routes/productoRoutes.js";
import { Producto } from "../../models/entities/producto.js";
import { TIPO_USUARIO } from "../../models/entities/tipoUsuario.js";
import { Usuario } from "../../models/entities/usuario.js";
import { MONEDA } from "../../models/entities/moneda.js";
import { expect, jest } from "@jest/globals";

const usuario = new Usuario("6","Pedro","pedrito@gmail.com","+54 9 11 6981-3124",TIPO_USUARIO.VENDEDOR,"2025-10-10");

const mockRepo = {
  findByPage: jest.fn(),
  contarTodos: jest.fn(),
};

const productoService = new ProductoService(mockRepo);
const productoController = new ProductoController(productoService);

const server = buildTestServer();
server.addRoute(productoRoutes);
server.setControllers(ProductoController, productoController);
server.configureRoutes();

describe("GET / producto", () => {
  test("Se filtra correctamente por precio", async () => {
    const sampleData = [
      new Producto(usuario,"Lapicera BIC","Con tinta borrable",100,MONEDA.PESO_ARG,true),
      new Producto(usuario,"Lapiz con goma","De punta HB",80,MONEDA.PESO_ARG,true),
      new Producto(usuario,"Cartuchera roja","Con 5 compartimientos",5000,MONEDA.PESO_ARG,true),
    ];

    const expectedFiltered = [sampleData[0], sampleData[1]];

    mockRepo.findByPage.mockResolvedValue(expectedFiltered);
    mockRepo.contarTodos.mockResolvedValue(100);

    const app = server && (server.app || (typeof server.getApp === "function" && server.getApp()) || server); //
    const res = await request(app).get("/productos?precioMin=80&precioMax=100");
    //  const res = await request(server.app).get("/producto?page=1&limit=3&precioMin=79&precioMax=101");

    expect(res.status).toBe(200);
    expect(mockRepo.findByPage).toHaveBeenCalled(); // confirma que el mock fue invocado

    // hace verificación de que recibe los 2 JSON que corresponde
    expect(Array.isArray(res.body.data)).toBeTruthy();
    expect(res.body.data).toHaveLength(2); // esperamos los 2 filtrados


    expect(res.body.data).toEqual(
      expect.arrayContaining([
      expect.objectContaining({ titulo: "Lapicera BIC", precio: 100 }),
      expect.objectContaining({ titulo: "Lapiz con goma", precio: 80 })
    ])
    );
  });
});