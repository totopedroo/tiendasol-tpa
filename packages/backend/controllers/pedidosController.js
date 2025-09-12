import { z } from "zod";
import { ESTADO_PEDIDO } from "../models/entities/estadoPedido.js";
import { PedidosService } from "../services/pedidosService.js";
import { MONEDA } from "../models/entities/moneda.js";

export class PedidosController {
  constructor(pedidosService) {
    this.pedidosService = pedidosService;
  }

  crear(req, res) {
    const body = req.body;
    const resultBody = pedidoSchema.safeParse(body);

    if (resultBody.error) {
      return res.status(400).json({ 
        error: resultBody.error,
        message: "Error en el formato del pedido"
      });
    }
    const nuevoPedido = this.pedidosService.create(resultBody.data);
    return res.status(201).json("El Pedido se creó con éxito");
  }

  // 564321

  findAll(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const filtros = req.query;

    const pedidosPaginados = this.pedidosService.findall(page, limit, filtros);
    if (pedidosPaginados === null) {
      return res.status(204).send();
    }
    res.status(200).json(pedidosPaginados);
  }

  findById(req, res) {
    const resultId = idTransform.safeParse(req.params.id);

    if (resultId.error) {
      return res.status(400).json(resultId.error.issues);
    }

    const id = resultId.data;
    const pedido = this.pedidosService.findById(id);
    if (!pedido) {
      res.status(404).json({
        error: "No se encontró un pedido con ese ID",
      });
      return;
    }
    res.status(200).json(pedido);
  }

  cambiarEstado(req, res) {
    const resultId = idTransform.safeParse(req.params.id);
    const nuevoEstadoData = estadoSchema.safeParse(req.query);

    if (resultId.error) {
      return res.status(400).json(resultId.error.issues);
    }

    if (nuevoEstadoData.error) {
      return res.status(400).json(nuevoEstadoData.error.issues);
    }

    const id = resultId.data;
    const nuevoEstado = nuevoEstadoData.data;
    var pedido;
    switch (nuevoEstado) {
      case "CANCELADO":
        pedido = this.pedidosService.cancelar(id);
        break;
      case "ENVIADO":
        pedido = this.pedidosService.marcarEnviado(id);
        break;
      default:
        return res.status(400).json({ error: "Nuevo estado inválido" });
    }
    res.status(200).json(pedido);
  }

  historialDelUsuario(req, res) {
    // user_id = id
    const userIdData = historialUsuarioSchema.safeParse(req.query);

    if (userIdData.error) {
      res.status(400).json(userIdData.error.issues);
      return;
    }

    const userId = userIdData.data;
    const pedidosUsuario = this.pedidosService.historialDelUsuario(userId);
    if (!pedidosUsuario) {
      res.status(404).json({
        userId: userId.userId,
        error: "El usuario con ese ID no existe o no tiene pedidos.",
      });
      return;
    }
    res.status(200).json(pedidosUsuario);
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
