import { z } from "zod";
import { ESTADO_PEDIDO } from "../models/entities/estadoPedido.js";
import { MONEDA } from "../models/entities/moneda.js";
import { ValidationError } from "../error/appError.js";

export class PedidosController {
  constructor(pedidosService) {
    this.pedidosService = pedidosService;
  }

  async crear(req, res, next) {
    try {
      const resultBody = pedidoSchema.safeParse(req.body);
      const nuevoPedido = await this.pedidosService.create(resultBody.data);
      return res.status(201).json(nuevoPedido);
    } catch (error) {
      next(error);
    }

    // if (resultBody.error) {
    //   return res.status(400).json({
    //     error: resultBody.error,
    //     message: "Error en el formato del pedido",
    //   });
    // }
  }

  // 564321

  async findAll(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const filtros = req.query;

      const pedidosPaginados = this.pedidosService.findall(
        page,
        limit,
        filtros,
      );
      if (pedidosPaginados === null) {
        return res.status(204).send();
      }
      res.status(200).json(pedidosPaginados);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const resultId = idTransform.safeParse(req.params.id);
      const pedido = await this.pedidosService.findById(resultId.data);
      res.json(pedido);
    } catch (error) {
      next(error);
    }

    // if (resultId.error) {
    //   return res.status(400).json(resultId.error.issues);
    // }

    // if (!pedido) {
    //   res.status(404).json({
    //     error: "No se encontró un pedido con ese ID",
    //   });
    //   return;
    // }
  }

  async cambiarEstado(req, res, next) {
    try {
      const resultId = idTransform.safeParse(req.params.id);
      const nuevoEstado = estadoSchema.safeParse(req.query);
      var pedido;
      switch (nuevoEstado.data) {
        case "CANCELADO":
          const motivo = req.body?.motivo ?? req.query?.motivo ?? null;
          pedido = await this.pedidosService.cancelar(resultId.data, motivo);
          break;
        case "ENVIADO":
          pedido = await this.pedidosService.marcarEnviado(resultId.data);
          break;
        case "CONFIRMADO":
          pedido = await this.pedidosService.confirmar(resultId.data);
          break;
        default:
          throw new ValidationError("Nuevo estado inválido");
      }
      res.status(200).json(pedido);
    } catch (error) {
      next(error);
    }

    // if (resultId.error) {
    //   return res.status(400).json(resultId.error.issues);
    // }

    // if (nuevoEstadoData.error) {
    //   return res.status(400).json(nuevoEstadoData.error.issues);
    // }
  }

  async historialDelUsuario(req, res, next) {
    try {
      const userId = historialUsuarioSchema.safeParse(req.query);
      const pedidosUsuario = this.pedidosService.historialDelUsuario(
        userId.data,
      );
      res.json(pedidosUsuario);
    } catch (error) {
      next(error);
    }
    // // user_id = id
    // const userIdData = historialUsuarioSchema.safeParse(req.query);

    // if (userIdData.error) {
    //   res.status(400).json(userIdData.error.issues);
    //   return;
    // }

    // const userId = userIdData.data;
    // const pedidosUsuario = this.pedidosService.historialDelUsuario(userId);
    // if (!pedidosUsuario) {
    //   res.status(404).json({
    //     userId: userId.userId,
    //     error: "El usuario con ese ID no existe o no tiene pedidos.",
    //   });
    //   return;
    // }
    // res.status(200).json(pedidosUsuario);
  }
}

const idTransform = z.string().transform((val, ctx) => {
  const num = Number(val);
  if (isNaN(num)) {
    ctx.addIssue({
      code: "INVALID_ID",
      message: "El ID debe ser un número",
    });
    return z.NEVER;
  }
  return num;
});

const estadoSchema = z.object({
  estado: z.enum(ESTADO_PEDIDO),
});

const historialUsuarioSchema = z.object({
  userId: idTransform,
});

const direccionEntregaSchema = z.object({
  calle: z.string(),
  altura: z.string().or(z.number()),
  piso: z.string().optional(),
  departamento: z.string().optional(),
  codigoPostal: z.string(),
  ciudad: z.string(),
  provincia: z.string(),
  pais: z.string(),
});

const pedidoSchema = z.object({
  moneda: z.enum(MONEDA),
  id_comprador: z.number().nonnegative(),
  direccionEntrega: direccionEntregaSchema,
  items: z.array(z.any()).nonempty(),
});
