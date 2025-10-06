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

  async obtenerSinLeer(req, res, next) {
    try {
      const params = notifParamsSchema.safeParse(req.params);
      const query  = paginacionSchema.safeParse(req.query);

      if (!params.success) return next(new ValidationError("Parámetros inválidos"));
      if (!query.success)  return next(new ValidationError("Parámetros de paginación inválidos"));

      const data = await this.service.obtenerNoLeidas(params.data.userId, {
        limit: query.data.limit,
        afterId: query.data.afterId, // null o ObjectId válido en string
      });

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async obtenerLeidas(req, res, next) {
    try {
      const params = notifParamsSchema.safeParse(req.params);
      const query  = paginacionSchema.safeParse(req.query);

      if (!params.success) return next(new ValidationError("Parámetros inválidos"));
      if (!query.success)  return next(new ValidationError("Parámetros de paginación inválidos"));

      const data = await this.service.obtenerLeidas(params.data.userId, {
        limit: query.data.limit,
        afterId: query.data.afterId,
      });

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

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
