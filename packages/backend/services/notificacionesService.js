export class NotificacionesService {
  /** @param {NotificacionesRepository} repo */
  constructor(repo) {
    this.repo = repo;
  }

  async obtenerNoLeidas(userId, opts) {
    return this.repo.obtenerPorUsuario(userId, { leidas: false, ...opts });
  }

  async obtenerLeidas(userId, opts) {
    return this.repo.obtenerPorUsuario(userId, { leidas: true, ...opts });
  }

  async marcarLeida(userId, notificacionId) {
    return this.repo.marcarComoLeida(userId, notificacionId);
  }


  async agregar(doc) {
    return this.repo.agregar(doc);
  }
}
