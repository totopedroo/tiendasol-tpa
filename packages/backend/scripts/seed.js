import { MongoDBClient } from "../config/database.js";
import { SeederService } from "../services/seederService.js";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

/**
 * Script para ejecutar el seeding de la base de datos
 * Uso: node scripts/seed.js [opciones]
 *
 * Opciones:
 *   --no-limpiar: No limpia la base de datos antes de agregar datos
 *   --usuarios=N: Cantidad de usuarios a crear (default: 50)
 *   --productos=N: Cantidad de productos adicionales (default: 100)
 *   --pedidos=N: Cantidad de pedidos a crear (default: 200)
 */
async function main() {
  try {
    console.log("🔌 Conectando a la base de datos...");
    await MongoDBClient.connect();
    console.log("✅ Conexión establecida\n");

    // Parsear argumentos de línea de comandos
    const args = process.argv.slice(2);
    const opciones = {
      limpiar: !args.includes("--no-limpiar"),
      cantidadUsuarios: 50,
      cantidadProductosAdicionales: 100,
      cantidadPedidos: 200,
    };

    // Parsear opciones de cantidad
    args.forEach((arg) => {
      if (arg.startsWith("--usuarios=")) {
        opciones.cantidadUsuarios = parseInt(arg.split("=")[1]);
      }
      if (arg.startsWith("--productos=")) {
        opciones.cantidadProductosAdicionales = parseInt(arg.split("=")[1]);
      }
      if (arg.startsWith("--pedidos=")) {
        opciones.cantidadPedidos = parseInt(arg.split("=")[1]);
      }
    });

    console.log("⚙️  Opciones de seeding:");
    console.log(`   - Limpiar BD: ${opciones.limpiar ? "Sí" : "No"}`);
    console.log(`   - Usuarios: ${opciones.cantidadUsuarios}`);
    console.log(
      `   - Productos adicionales: ${opciones.cantidadProductosAdicionales}`
    );
    console.log(`   - Pedidos: ${opciones.cantidadPedidos}\n`);

    // Ejecutar seeding
    await SeederService.ejecutarSeeding(opciones);

    console.log("\n✨ Proceso completado. Cerrando conexión...");
    process.exit(0);
  } catch (error) {
    console.error("\n💥 Error fatal:", error);
    process.exit(1);
  }
}

main();
