import pedidosRoutes from "./pedidosRoutes.js";
import healthRoute from "./health.js";
import productoRoutes from "./productoRoutes.js";
import swaggerRoutes from "./swaggerRoutes.js";
import notificacionesRoutes from "./notificacionesRoutes.js";
import categoriaRoutes from "./categoriaRoutes.js";
import usuarioRoutes from "./usuarioRoutes.js";
import authRoutes from "./authRoutes.js";

const routes = [productoRoutes, pedidosRoutes, healthRoute, swaggerRoutes, notificacionesRoutes, categoriaRoutes, usuarioRoutes, authRoutes];

export default routes;
