import { NotFoundError } from "../error/appError.js";

export class ProductoService {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }

  async findAll(page, limit, filtros) {
    const numeroPagina = Math.max(Number(page), 1);
    const elementosPorPagina = Math.min(Math.max(Number(limit), 1), 100);

    const productos = await this.productoRepository.findByPage(
      numeroPagina,
      elementosPorPagina,
      filtros
    );

    if (!productos) {
      throw new NotFoundError("No hay ningún producto en la base de datos.");
    }

    const total = await this.productoRepository.contarTodos();
    const totalPaginas = Math.ceil(total / elementosPorPagina);

    return {
      pagina: numeroPagina,
      perPage: elementosPorPagina,
      total: total,
      totalPaginas: totalPaginas,
      data: productos,
    };
  }

  async create(data) {
    // TODO: validar que el usuario y categoria
    // NOTE: falta validar que el id usuario y los id de categoria existan

    // TODO: validar que el usuario sea un vendedor
    // NOTE: los productos solo lo puede agregar un vendedor (?)
    const producto = await this.productoRepository.save(data);
    return producto;
  }

  async findById(id) {
    const producto = await this.productoRepository.findById(id);
    if (!producto) {
      throw new NotFoundError("Producto no encontrado");
    }
    return producto;
  }

  async update(id, data) {
    const producto = await this.productoRepository.findById(id);
    if (!producto) {
      throw new NotFoundError("Producto no encontrado");
    }
    const productoActual = await this.productoRepository.update(id, data);
    return productoActual;
  }

  async delete(id) {
    const producto = await this.productoRepository.findById(id);
    if (!producto) {
      throw new NotFoundError("Producto no encontrado.");
    }
    await this.productoRepository.delete(id);
    return producto;
  }
}
