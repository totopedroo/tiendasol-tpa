import pedidosRoutes from "./pedidosRoutes.js";
import healthRoute from "./health.js";
import productoRoutes from "./productoRoutes.js";
import swaggerRoutes from "./swaggerRoutes.js";
import notificacionesRoutes from "./notificacionesRoutes.js";

const routes = [productoRoutes, pedidosRoutes, healthRoute, swaggerRoutes, notificacionesRoutes];

export default routes;
