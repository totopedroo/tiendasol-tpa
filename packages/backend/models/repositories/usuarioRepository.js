import { UsuarioModel } from "../../schemas/usuarioSchema.js"; 

export class UsuarioRepository {
  constructor() {
    this.model = UsuarioModel;
  }

  async findAll(filtros = {}) {
    const filtrosMongo = {};
        
        if (filtros.nombre) {
          filtrosMongo.nombre = { $regex: filtros.nombre, $options: "i" };
        }
    
        if (filtros.tipo) {
          filtrosMongo.tipo = filtros.tipo;
        }
    
        return await this.model.find(filtrosMongo);
  }

  async save(data) {
    const Usuario = new this.model(data);
    const UsuarioGuardado = await Usuario.save();
    return await this.model
      .findById(UsuarioGuardado._id);
  }

  async findById(id) {
    return await this.model
      .findById(id);
  }

  async update(id, UsuarioModificado) {
    return await this.model
      .findByIdAndUpdate(id, UsuarioModificado, {
        new: true,
      });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

}
