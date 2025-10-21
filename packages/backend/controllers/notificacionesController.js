import { z } from "zod";
import { MongoDBClient } from "../config/database.js";
import { ObjectId as MongoObjectId } from "mongodb";
import { ValidationError, NotFoundError } from "../error/appError.js";

const ObjectId = MongoDBClient.ObjectId ?? MongoObjectId;

export class NotificacionesController {
  /** @param {import('../services/notificacionesService.js').NotificacionesService} service */
  constructor(service) {
    this.service = service;
  }

  listar = async (req, res, next) => {
    try {
      const params = notifParamsSchema.safeParse(req.params);
      if (!params.success) return next(new ValidationError("Parámetros inválidos"));

      const pag = paginacionSchema.safeParse(req.query);
      if (!pag.success) return next(new ValidationError("Parámetros de paginación inválidos"));

      const filt = filtroLeidasSchema.safeParse(req.query);
      if (!filt.success) return next(new ValidationError(filt.error.issues?.[0]?.message ?? "Filtro inválido"));

      // Derivar el boolean final
      const leidas =
        filt.data.leidas ??
        (filt.data.estado ? filt.data.estado === "leidas" : false); // default: sin-leer

      const data = await this.service.listar(params.data.userId, {
        limit: pag.data.limit,
        afterId: pag.data.afterId,
        leidas,
      });

      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  async marcarComoLeida(req, res, next) {
    try {
      const params = notifParamsWithIdSchema.safeParse(req.params);
      if (!params.success) return next(new ValidationError("IDs inválidos"));

      const n = await this.service.marcarLeida(params.data.userId, params.data.id);
      if (!n) return next(new NotFoundError("Notificación no encontrada o ya leída"));

      return res.status(200).json(n);
    } catch (error) {
      next(error);
    }
  }
}

// acepta dos formas: ?leidas=true/false o ?estado=leidas/sin-leer
const filtroLeidasSchema = z.object({
  leidas: z.coerce.boolean().optional(),
  estado: z.enum(["leidas", "sin-leer"]).optional(),
}).refine(
  (v) => !(v.leidas !== undefined && v.estado !== undefined), 
  { message: "Usá 'leidas' o 'estado', no ambos" }
);

const objectIdSchema = z.string().refine(
  (v) => ObjectId.isValid(String(v)),
  { message: "ObjectId inválido" }
);

const notifParamsSchema = z.object({
  userId: objectIdSchema,
});

const notifParamsWithIdSchema = z.object({
  userId: objectIdSchema,
  id: objectIdSchema,
});

const paginacionSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
  afterId: z
    .string()
    .refine((v) => ObjectId.isValid(String(v)), { message: "afterId inválido" })
    .optional()
    .nullable()
    .transform((v) => v ?? null),
});
