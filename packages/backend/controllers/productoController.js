import { MONEDA } from "../models/entities/moneda.js";
import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const productoIdSchema = z.object({
  id: z.string().regex(objectIdRegex, "ProductoID inválido"),
});

export const productoSchema = z.object({
  vendedor: z
    .string("Falta atributo.")
    .regex(objectIdRegex, "ID de vendedor inválido"),
  titulo: z.string("Falta atributo.").min(3, "Cantidad minima 3."),
  descripcion: z.string("Falta atributo.").min(3, "Cantidad minima 3."),
  precio: z.number("Falta atributo.").nonnegative("Numero negativo."),
  moneda: z.enum(Object.values(MONEDA), "Moneda inválida"),
  activo: z.boolean("Falta atributo."),
  categorias: z.array(
    z.string().regex(objectIdRegex, "ID de categoría inválido.")
  ),
  fotos: z.array(z.string()),
  stock: z
    .number("Falta atributo.")
    .int("No es numero entero.")
    .positive("No es numero entero positivo."),
});

export class ProductoController {
  constructor(productoService) {
    this.productoService = productoService;
  }

  async findAll(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const filtros = req.query;

      const productosPaginados = await this.productoService.findAll(
        page,
        limit,
        filtros
      );
      if (productosPaginados === null) {
        return res.status(204).send();
      }
      res.status(200).json(productosPaginados);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const validacionBody = productoSchema.safeParse(req.body);
      if (!validacionBody.success) {
        return res.status(400).json(validacionBody.error.issues);
      }
      const producto = await this.productoService.create(req.body);
      res.status(201).json(producto);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const validacionId = productoIdSchema.safeParse(req.params);
      if (!validacionId.success) {
        return res.status(400).json(validacionId.error.issues);
      }
      const producto = await this.productoService.findById(req.params.id);
      res.json(producto);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const validacionBody = productoSchema.safeParse(req.body);
      if (!validacionBody.success) {
        return res.status(400).json(validacionBody.error.issues);
      }
      const validacionId = productoIdSchema.safeParse(req.params);
      if (!validacionId.success) {
        return res.status(400).json(validacionId.error.issues);
      }
      const producto = await this.productoService.update(
        req.params.id,
        req.body
      );
      res.json(producto);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const producto = await this.productoService.delete(req.params.id);
      res.json({ message: "Producto eliminado" });
    } catch (error) {
      next(error);
    }
  }
}
