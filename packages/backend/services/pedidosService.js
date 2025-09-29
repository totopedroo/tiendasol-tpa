import { Pedido } from "../models/entities/pedido.js";
import { DireccionEntrega } from "../models/entities/direccionEntrega.js";
import { ItemPedido } from "../models/entities/itemPedido.js";
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../error/appError.js";

export class PedidosService {
  constructor(pedidosRepository) {
    this.pedidosRepository = pedidosRepository;
  }

  async create(data) {
    const d = data.direccionEntrega;
    const direccionEntrega = new DireccionEntrega(
      d.calle,
      d.altura,
      d.piso,
      d.departamento,
      d.codigoPostal,
      d.ciudad,
      d.provincia,
      d.pais,
    );

    const items = data.items.map(
      (item) =>
        new ItemPedido(item.producto, item.cantidad, item.precioUnitario),
    );

    const nuevoPedido = new Pedido(
      data.id_comprador,
      data.moneda,
      direccionEntrega,
      items,
    );

    if (!nuevoPedido.validarStock()) {
      throw new ConflictError(
        "No hay stock disponible para uno o más productos.",
      );
    }

    nuevoPedido.calcularTotal();

    return await this.pedidosRepository.create(nuevoPedido);
  }

  async findById(id) {
    const pedido = await this.pedidosRepository.findById(id);
    if (!pedido) {
      throw new NotFoundError(
        "No se encontró el pedido con el ID especificado",
      );
    }
    return pedido;
  }

  async historialDelUsuario(userId) {
    const pedidosUsuario =
      await this.pedidosRepository.getHistorialDeUsuario(userId);
    if (!pedidosUsuario) {
      throw new NotFoundError(
        "El usuario con ese ID no existe o no tiene pedidos",
      );
    }
    return pedidosUsuario;
  }

  async findAll(page, limit, filtros) {
    const numeroPagina = Math.max(Number(page), 1);
    const elementosPorPagina = Math.min(Math.max(Number(limit), 1), 100);

    const pedidos = await this.pedidosRepository.findByPage(
      numeroPagina,
      elementosPorPagina,
      filtros,
    );

    if (!pedidos) {
      throw new NotFoundError("No hay ningún pedido en la base de datos.");
    }

    const total = await this.pedidosRepository.contarTodos();
    const totalPaginas = Math.ceil(total / elementosPorPagina);

    return {
      pagina: numeroPagina,
      perPage: elementosPorPagina,
      total,
      totalPaginas,
      data: pedidos,
    };
  }

  async cancelar(id) {
    const pedido = await this.pedidosRepository.cancelar(id);
    if (!pedido) {
      throw new NotFoundError(
        "No se encontró el pedido con el ID especificado",
      );
    }
    return pedido;
  }

  async marcarEnviado(id) {
    const pedido = await this.pedidosRepository.marcarEnviado(id);
    if (!pedido) {
      throw new NotFoundError(
        "No se encontró el pedido con el ID especificado",
      );
    }
    return pedido;
  }
}
