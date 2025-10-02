import { NotFoundError } from "../error/appError"

export class ProductoService {
    constructor(productoRepository) {
        this.productoRepository = productoRepository
    }

    async findAll(page, limit, filtros) {
        const numeroPagina = Math.max(Number(page), 1);
        const elementosPorPagina = Math.min(Math.max(Number(limit), 1), 100);
    
        const productos = await this.productoRepository.findByPage(
          numeroPagina,
          elementosPorPagina,
          filtros,
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
}