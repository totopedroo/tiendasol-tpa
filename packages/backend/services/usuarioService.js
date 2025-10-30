import { NotFoundError } from "../error/appError.js";

export class UsuarioService {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async findAll(filtros) {
    const usuarios = await this.usuarioRepository.findAll(filtros);

    if (!usuarios.length) {
      return [];
    }

    return usuarios;
  }

  async create(data) {
    const usuario = await this.usuarioRepository.save(data);
    return usuario;
  }

  async findById(id) {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) {
      throw new NotFoundError("categoria no encontrado");
    }
    return usuario;
  }

  async update(id, data) {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) {
      throw new NotFoundError("Categoria no encontrada.");
    }
    const usuarioActual = await this.usuarioRepository.update(id, data);
    return usuarioActual;
  }

  async delete(id) {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) {
      throw new NotFoundError("Categoria no encontrada.");
    }
    await this.usuarioRepository.delete(id);
    return usuario;
  }
}
