export function parseNotificacion(noti) {
  const msg = noti.mensaje || "";

  const lineas = msg.split("\n").map(l => l.trim());

  // 1) Estado + emisor
  // Ej: "Confirmación de pedido por Juan Pérez"
  const primera = lineas[0] ?? "";
  const [titulo, por, emisor] = primera.split(" por ");

  // 2) Productos
  // Ej: "Productos: Mate - 1 | Café - 2"
  const productosLinea = lineas.find(l => l.startsWith("Productos:")) || "";
  const productos = productosLinea.replace("Productos:", "").trim();

  // 3) Total
  const totalLinea = lineas.find(l => l.startsWith("Total:")) || "";
  const total = totalLinea.replace("Total:", "").trim();

  // 4) Dirección
  const direccionLinea = lineas.find(l => l.startsWith("Dirección")) || "";
  const direccion = direccionLinea.replace("Dirección de entrega:", "").trim();

  return {
    titulo,
    emisor: emisor || null,
    productos,
    total,
    direccion,
    ...noti
  };
}