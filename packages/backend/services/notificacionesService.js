export class NotificacionesService {
  /** @param {NotificacionesRepository} repo */
  constructor(repo) {
    this.repo = repo;
  }

  async listar(userId, opts) {
    const { leidas = false, ...rest } = opts || {};
    return this.repo.obtenerPorUsuario(userId, { leidas, ...rest });
  }

  async marcarLeida(userId, notificacionId) {
    return this.repo.marcarComoLeida(userId, notificacionId);
  }


  async agregar(doc) {
    return this.repo.agregar(doc);
  }
}
