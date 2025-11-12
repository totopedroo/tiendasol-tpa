import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const categoriaIdSchema = z.object({
  id: z.string().regex(objectIdRegex, "CategoriaID inválido"),
});

export const categoriaSchema = z.object({
  nombre: z.string("Falta atributo.").min(3, "Cantidad minima 3."),
});

export class CategoriaController {
  constructor(categoriaService) {
    this.categoriaService = categoriaService;
  }

  async findAll(req, res, next) {
    try {
      const categorias = await this.categoriaService.findAll();
      if (categorias === null) {
        return res.status(204).send();
      }
      res.status(200).json(categorias);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const validacionBody = categoriaSchema.safeParse(req.body);
      if (!validacionBody.success) {
        return res.status(400).json(validacionBody.error.issues);
      }
      const categoria = await this.categoriaService.create(req.body);
      res.status(201).json(categoria);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const validacionId = categoriaIdSchema.safeParse(req.params);
      if (!validacionId.success) {
        return res.status(400).json(validacionId.error.issues);
      }
      const categoria = await this.categoriaService.findById(req.params.id);
      res.json(categoria);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const validacionBody = categoriaSchema.safeParse(req.body);
      if (!validacionBody.success) {
        return res.status(400).json(validacionBody.error.issues);
      }
      const validacionId = categoriaIdSchema.safeParse(req.params);
      if (!validacionId.success) {
        return res.status(400).json(validacionId.error.issues);
      }
      const categoria = await this.categoriaService.update(
        req.params.id,
        req.body
      );
      res.json(categoria);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const validacionId = categoriaIdSchema.safeParse(req.params);
      if (!validacionId.success) {
        return res.status(400).json(validacionId.error.issues);
      }
      const categoria = await this.categoriaService.delete(req.params.id);
      res.json({ message: "Categoría eliminada" });
    } catch (error) {
      next(error);
    }
  }
}
