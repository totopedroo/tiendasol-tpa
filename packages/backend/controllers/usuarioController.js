import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const usuarioIdSchema = z.object({
  id: z.string().regex(objectIdRegex, "UsuarioID inválido"),
});

export const usuarioSchema = z.object({
  nombre: z.string("Falta atributo.").min(4, "Cantidad minima 4."),
  email: z.string("Falta email.").min(6, "Cantidad minima 4."),
  telefono: z.string("Falta telefono.").min(11, "Cantidad minima 11."),
  tipo: z.string("Falta tipo de usuario.").min(5, "Cantidad minima 5."),
});

export class UsuarioController {
  constructor(usuarioService) {
    this.usuarioService = usuarioService;
  }

  async findAll(req, res, next) {
    try {
      const filtros = req.query;
      const usuarios = await this.usuarioService.findAll(filtros);

      if (!usuarios.length) {
        return res.status(204).send();
      }

      res.status(200).json(usuarios);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const validacionBody = usuarioSchema.safeParse(req.body);
      if (!validacionBody.success) {
        return res.status(400).json(validacionBody.error.issues);
      }
      const usuario = await this.usuarioService.create(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const validacionId = usuarioIdSchema.safeParse(req.params);
      if (!validacionId.success) {
        return res.status(400).json(validacionId.error.issues);
      }
      const usuario = await this.usuarioService.findById(req.params.id);
      res.json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const validacionBody = usuarioSchema.safeParse(req.body);
      if (!validacionBody.success) {
        return res.status(400).json(validacionBody.error.issues);
      }
      const validacionId = usuarioIdSchema.safeParse(req.params);
      if (!validacionId.success) {
        return res.status(400).json(validacionId.error.issues);
      }
      const usuario = await this.usuarioService.update(
        req.params.id,
        req.body
      );
      res.json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const validacionId = usuarioIdSchema.safeParse(req.params);
      if (!validacionId.success) {
        return res.status(400).json(validacionId.error.issues);
      }
      const usuario = await this.usuarioService.delete(req.params.id);
      res.json({ message: "Categoría eliminada" });
    } catch (error) {
      next(error);
    }
  }
}
