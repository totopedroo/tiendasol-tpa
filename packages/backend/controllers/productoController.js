

export class ProductoController {
    constructor(productoService){
        this.productoService = productoService
    }
    
    async findAll(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const filtros = req.query;

      const productosPaginados = this.productoService.findAll(
        page,
        limit,
        filtros,
      );
      if (productosPaginados === null) {
        return res.status(204).send();
      }
      res.status(200).json(productosPaginados);
    } catch (error) {
      next(error);
    }
  }
     
}