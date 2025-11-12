import { NotFoundError } from "../error/appError.js";

export class CategoriaService {
  constructor(categoriaRepository) {
    this.categoriaRepository = categoriaRepository;
  }

  async findAll() {
    const categorias = await this.categoriaRepository.findAll();
    if (!categorias) {
      throw new NotFoundError("No hay ningún categoria en la base de datos.");
    }
    return {
      categorias,
    };
  }

  async create(data) {
    const categoria = await this.categoriaRepository.save(data);
    return categoria;
  }

  async findById(id) {
    const categoria = await this.categoriaRepository.findById(id);
    if (!categoria) {
      throw new NotFoundError("categoria no encontrado");
    }
    return categoria;
  }

  async update(id, data) {
    const categoria = await this.categoriaRepository.findById(id);
    if (!categoria) {
      throw new NotFoundError("Categoria no encontrada.");
    }
    const categoriaActual = await this.categoriaRepository.update(id, data);
    return categoriaActual;
  }

  async delete(id) {
    const categoria = await this.categoriaRepository.findById(id);
    if (!categoria) {
      throw new NotFoundError("Categoria no encontrada.");
    }
    await this.categoriaRepository.delete(id);
    return categoria;
  }
}
