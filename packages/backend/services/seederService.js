import { UsuarioModel } from "../schemas/usuarioSchema.js";
import { ProductoModel, CategoriaModel } from "../schemas/productoSchema.js";
import { PedidoModel } from "../schemas/pedidoSchema.js";
import { ItemPedidoModel } from "../schemas/itemPedidoSchema.js";
import { TIPO_USUARIO } from "../models/entities/tipoUsuario.js";
import { MONEDA } from "../models/entities/moneda.js";
import { ESTADO_PEDIDO } from "../models/entities/estadoPedido.js";

export class SeederService {
  // Datos mock para generación
  static nombres = [
    "Juan",
    "María",
    "Carlos",
    "Ana",
    "Pedro",
    "Laura",
    "Diego",
    "Sofía",
    "Luis",
    "Carmen",
    "Miguel",
    "Patricia",
    "Jorge",
    "Elena",
    "Ricardo",
    "Valentina",
    "Fernando",
    "Camila",
    "Roberto",
    "Isabella",
    "Andrés",
    "Lucía",
    "Gabriel",
    "Martina",
    "Daniel",
    "Victoria",
    "Manuel",
    "Emilia",
  ];

  static apellidos = [
    "García",
    "Rodríguez",
    "Martínez",
    "López",
    "Pérez",
    "González",
    "Sánchez",
    "Ramírez",
    "Torres",
    "Flores",
    "Rivera",
    "Gómez",
    "Díaz",
    "Cruz",
    "Morales",
    "Reyes",
    "Gutiérrez",
    "Ortiz",
    "Chávez",
    "Ruiz",
    "Jiménez",
    "Hernández",
  ];

  static categorias = [
    "Electrónica",
    "Ropa",
    "Hogar",
    "Deportes",
    "Libros",
    "Juguetes",
    "Alimentos",
    "Belleza",
    "Automotriz",
    "Jardín",
    "Mascotas",
    "Herramientas",
    "Música",
    "Gaming",
    "Oficina",
    "Bebés",
    "Salud",
    "Arte",
  ];

  static productosBase = [
    // Electrónica
    {
      titulo: 'Laptop HP 15.6"',
      categoria: "Electrónica",
      precio: 450000,
      descripcion: "Laptop con procesador Intel Core i5, 8GB RAM, 256GB SSD",
      stock: 15,
    },
    {
      titulo: "Mouse Inalámbrico Logitech",
      categoria: "Electrónica",
      precio: 8500,
      descripcion: "Mouse ergonómico con conexión Bluetooth",
      stock: 50,
    },
    {
      titulo: "Teclado Mecánico RGB",
      categoria: "Electrónica",
      precio: 25000,
      descripcion:
        "Teclado gaming con switches mecánicos y retroiluminación RGB",
      stock: 30,
    },
    {
      titulo: 'Monitor LG 24" Full HD',
      categoria: "Electrónica",
      precio: 85000,
      descripcion: "Monitor LED con tecnología IPS y frecuencia de 75Hz",
      stock: 20,
    },
    {
      titulo: "Auriculares Sony WH-1000XM4",
      categoria: "Electrónica",
      precio: 120000,
      descripcion: "Auriculares con cancelación de ruido activa",
      stock: 12,
    },
    {
      titulo: "Smartphone Samsung Galaxy A54",
      categoria: "Electrónica",
      precio: 280000,
      descripcion: 'Smartphone con pantalla AMOLED de 6.4" y cámara de 50MP',
      stock: 25,
    },
    {
      titulo: "Tablet iPad Air",
      categoria: "Electrónica",
      precio: 380000,
      descripcion: 'Tablet con chip M1 y pantalla de 10.9"',
      stock: 10,
    },
    {
      titulo: "Smartwatch Xiaomi Band 7",
      categoria: "Electrónica",
      precio: 18000,
      descripcion: "Reloj inteligente con monitor de frecuencia cardíaca",
      stock: 40,
    },
    {
      titulo: "Cámara Web Logitech C920",
      categoria: "Electrónica",
      precio: 35000,
      descripcion: "Webcam Full HD 1080p con micrófono integrado",
      stock: 22,
    },
    {
      titulo: "Disco Duro Externo 1TB",
      categoria: "Electrónica",
      precio: 28000,
      descripcion: "HDD portátil USB 3.0 para respaldo de datos",
      stock: 35,
    },

    // Ropa
    {
      titulo: "Remera Nike Dri-Fit",
      categoria: "Ropa",
      precio: 12000,
      descripcion: "Remera deportiva con tecnología de absorción de humedad",
      stock: 60,
    },
    {
      titulo: "Jean Levi's 501",
      categoria: "Ropa",
      precio: 35000,
      descripcion: "Jean clásico de corte recto",
      stock: 45,
    },
    {
      titulo: "Zapatillas Adidas Ultraboost",
      categoria: "Ropa",
      precio: 85000,
      descripcion: "Zapatillas running con tecnología Boost",
      stock: 28,
    },
    {
      titulo: "Campera The North Face",
      categoria: "Ropa",
      precio: 95000,
      descripcion: "Campera impermeable para trekking",
      stock: 18,
    },
    {
      titulo: "Buzo Hoodie Puma",
      categoria: "Ropa",
      precio: 28000,
      descripcion: "Buzo con capucha de algodón",
      stock: 50,
    },
    {
      titulo: "Vestido Zara Floral",
      categoria: "Ropa",
      precio: 22000,
      descripcion: "Vestido casual de verano con estampado floral",
      stock: 30,
    },
    {
      titulo: "Camisa Tommy Hilfiger",
      categoria: "Ropa",
      precio: 18000,
      descripcion: "Camisa slim fit de algodón",
      stock: 40,
    },
    {
      titulo: "Shorts Deportivos Under Armour",
      categoria: "Ropa",
      precio: 15000,
      descripcion: "Shorts para entrenamientos con tecnología HeatGear",
      stock: 55,
    },

    // Hogar
    {
      titulo: "Cafetera Nespresso",
      categoria: "Hogar",
      precio: 65000,
      descripcion: "Cafetera de cápsulas con 19 bares de presión",
      stock: 15,
    },
    {
      titulo: "Licuadora Philips 600W",
      categoria: "Hogar",
      precio: 28000,
      descripcion: "Licuadora con jarra de vidrio de 2 litros",
      stock: 25,
    },
    {
      titulo: "Aspiradora Robot Xiaomi",
      categoria: "Hogar",
      precio: 180000,
      descripcion: "Robot aspirador con mapeo láser y app móvil",
      stock: 12,
    },
    {
      titulo: "Juego de Sábanas Queen",
      categoria: "Hogar",
      precio: 18000,
      descripcion: "Sábanas de algodón egipcio 400 hilos",
      stock: 40,
    },
    {
      titulo: "Lámpara LED Escritorio",
      categoria: "Hogar",
      precio: 8500,
      descripcion: "Lámpara ajustable con 3 niveles de intensidad",
      stock: 50,
    },
    {
      titulo: "Set de Ollas Tefal",
      categoria: "Hogar",
      precio: 45000,
      descripcion: "Juego de 5 ollas antiadherentes",
      stock: 20,
    },
    {
      titulo: "Almohadas Memory Foam",
      categoria: "Hogar",
      precio: 12000,
      descripcion: "Par de almohadas viscoelásticas",
      stock: 35,
    },
    {
      titulo: "Cortinas Blackout",
      categoria: "Hogar",
      precio: 15000,
      descripcion: "Cortinas opacas con sistema de argollas",
      stock: 30,
    },

    // Deportes
    {
      titulo: "Bicicleta Mountain Bike",
      categoria: "Deportes",
      precio: 250000,
      descripcion: "MTB rodado 29 con suspensión delantera",
      stock: 8,
    },
    {
      titulo: "Pelota de Fútbol Adidas",
      categoria: "Deportes",
      precio: 15000,
      descripcion: "Balón oficial tamaño 5",
      stock: 45,
    },
    {
      titulo: "Colchoneta Yoga Manduka",
      categoria: "Deportes",
      precio: 18000,
      descripcion: "Mat de yoga profesional 6mm",
      stock: 32,
    },
    {
      titulo: "Pesas Hexagonales 10kg",
      categoria: "Deportes",
      precio: 22000,
      descripcion: "Set de mancuernas con recubrimiento de goma",
      stock: 25,
    },
    {
      titulo: "Raqueta de Tenis Wilson",
      categoria: "Deportes",
      precio: 45000,
      descripcion: "Raqueta profesional con encordado",
      stock: 15,
    },
    {
      titulo: "Tabla de Skate Element",
      categoria: "Deportes",
      precio: 35000,
      descripcion: "Skateboard completo con rodamientos ABEC-7",
      stock: 20,
    },
    {
      titulo: "Cuerda de Saltar Speed",
      categoria: "Deportes",
      precio: 5000,
      descripcion: "Soga de velocidad ajustable con contador",
      stock: 60,
    },

    // Libros
    {
      titulo: "El Quijote - Cervantes",
      categoria: "Libros",
      precio: 8500,
      descripcion: "Edición completa ilustrada",
      stock: 50,
    },
    {
      titulo: "Cien Años de Soledad",
      categoria: "Libros",
      precio: 7500,
      descripcion: "Clásico de García Márquez",
      stock: 45,
    },
    {
      titulo: "Harry Potter Colección",
      categoria: "Libros",
      precio: 35000,
      descripcion: "Box set con los 7 libros",
      stock: 20,
    },
    {
      titulo: "Sapiens - Yuval Harari",
      categoria: "Libros",
      precio: 12000,
      descripcion: "De animales a dioses",
      stock: 38,
    },
    {
      titulo: "El Principito",
      categoria: "Libros",
      precio: 5500,
      descripcion: "Edición ilustrada a color",
      stock: 65,
    },
    {
      titulo: "1984 - George Orwell",
      categoria: "Libros",
      precio: 6800,
      descripcion: "Novela distópica clásica",
      stock: 42,
    },

    // Juguetes
    {
      titulo: "LEGO Star Wars Millennium Falcon",
      categoria: "Juguetes",
      precio: 85000,
      descripcion: "Set de construcción 1351 piezas",
      stock: 12,
    },
    {
      titulo: "Muñeca Barbie Fashionista",
      categoria: "Juguetes",
      precio: 15000,
      descripcion: "Incluye accesorios y ropa",
      stock: 35,
    },
    {
      titulo: "Hot Wheels Pista Looping",
      categoria: "Juguetes",
      precio: 28000,
      descripcion: "Pista con loop y lanzador",
      stock: 22,
    },
    {
      titulo: "Puzzle 1000 Piezas",
      categoria: "Juguetes",
      precio: 8500,
      descripcion: "Rompecabezas de paisaje europeo",
      stock: 40,
    },
    {
      titulo: "Nerf Elite 2.0 Blaster",
      categoria: "Juguetes",
      precio: 22000,
      descripcion: "Lanzador con 20 dardos incluidos",
      stock: 28,
    },

    // Gaming
    {
      titulo: "PlayStation 5",
      categoria: "Gaming",
      precio: 550000,
      descripcion: "Consola de última generación con lector de discos",
      stock: 5,
    },
    {
      titulo: "Control Xbox Inalámbrico",
      categoria: "Gaming",
      precio: 45000,
      descripcion: "Gamepad compatible con PC y Xbox",
      stock: 30,
    },
    {
      titulo: "Silla Gamer DXRacer",
      categoria: "Gaming",
      precio: 180000,
      descripcion: "Silla ergonómica con soporte lumbar",
      stock: 10,
    },
    {
      titulo: "Micrófono Blue Yeti",
      categoria: "Gaming",
      precio: 85000,
      descripcion: "Micrófono USB para streaming",
      stock: 18,
    },
    {
      titulo: "The Last of Us Part II",
      categoria: "Gaming",
      precio: 25000,
      descripcion: "Juego exclusivo para PlayStation",
      stock: 40,
    },

    // Belleza
    {
      titulo: "Set de Maquillaje MAC",
      categoria: "Belleza",
      precio: 45000,
      descripcion: "Kit profesional con 20 productos",
      stock: 15,
    },
    {
      titulo: "Perfume Carolina Herrera",
      categoria: "Belleza",
      precio: 38000,
      descripcion: "Good Girl EDP 80ml",
      stock: 25,
    },
    {
      titulo: "Secador de Pelo Philips",
      categoria: "Belleza",
      precio: 32000,
      descripcion: "Secador iónico 2200W",
      stock: 20,
    },
    {
      titulo: "Crema Facial La Roche-Posay",
      categoria: "Belleza",
      precio: 18000,
      descripcion: "Hidratante para piel sensible",
      stock: 35,
    },
    {
      titulo: "Set de Brochas Morphe",
      categoria: "Belleza",
      precio: 22000,
      descripcion: "12 brochas profesionales",
      stock: 28,
    },
  ];

  static calles = [
    "Av. Corrientes",
    "Av. Santa Fe",
    "Av. Rivadavia",
    "Calle Florida",
    "Av. Callao",
    "Av. 9 de Julio",
    "Av. Belgrano",
    "Av. Córdoba",
    "Calle Lavalle",
    "Av. San Juan",
    "Av. Independencia",
    "Calle Reconquista",
  ];

  static ciudades = [
    "Buenos Aires",
    "Córdoba",
    "Rosario",
    "Mendoza",
    "La Plata",
    "San Miguel de Tucumán",
    "Mar del Plata",
    "Salta",
    "Santa Fe",
  ];

  static provincias = [
    "Buenos Aires",
    "Córdoba",
    "Santa Fe",
    "Mendoza",
    "Tucumán",
    "Entre Ríos",
    "Salta",
    "Misiones",
    "Chaco",
    "Corrientes",
  ];

  /**
   * Genera un número aleatorio entre min y max (inclusive)
   */
  static random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Selecciona un elemento aleatorio de un array
   */
  static randomElement(array) {
    return array[this.random(0, array.length - 1)];
  }

  /**
   * Genera un email a partir del nombre
   */
  static generarEmail(nombre, apellido) {
    const dominios = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];
    const nombreFormateado = nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const apellidoFormateado = apellido
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return `${nombreFormateado}.${apellidoFormateado}${this.random(1, 999)}@${this.randomElement(dominios)}`;
  }

  /**
   * Genera un teléfono argentino
   */
  static generarTelefono() {
    const codigos = ["11", "351", "341", "261", "381", "223"];
    return `+54 ${this.randomElement(codigos)} ${this.random(1000, 9999)}-${this.random(1000, 9999)}`;
  }

  /**
   * Genera una fecha aleatoria en el último año
   */
  static generarFechaAleatoria(diasAtras = 365) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - this.random(0, diasAtras));
    return fecha;
  }

  /**
   * Limpia todas las colecciones
   */
  static async limpiarBaseDatos() {
    console.log("🗑️  Limpiando base de datos...");
    await UsuarioModel.deleteMany({});
    await CategoriaModel.deleteMany({});
    await ProductoModel.deleteMany({});
    await ItemPedidoModel.deleteMany({});
    await PedidoModel.deleteMany({});
    console.log("✅ Base de datos limpiada");
  }

  /**
   * Crea usuarios mock
   */
  static async crearUsuarios(cantidad = 50) {
    console.log(`👥 Creando ${cantidad} usuarios...`);
    const usuarios = [];

    for (let i = 0; i < cantidad; i++) {
      const nombre = this.randomElement(this.nombres);
      const apellido = this.randomElement(this.apellidos);
      const nombreCompleto = `${nombre} ${apellido}`;

      // 70% compradores, 25% vendedores, 5% admin
      let tipo;
      const rand = Math.random();
      if (rand < 0.7) {
        tipo = TIPO_USUARIO.COMPRADOR;
      } else if (rand < 0.95) {
        tipo = TIPO_USUARIO.VENDEDOR;
      } else {
        tipo = TIPO_USUARIO.ADMIN;
      }

      const usuario = new UsuarioModel({
        nombre: nombreCompleto,
        email: this.generarEmail(nombre, apellido),
        telefono: this.generarTelefono(),
        tipo: tipo,
        fechaAlta: this.generarFechaAleatoria(730), // Hasta 2 años atrás
      });

      usuarios.push(usuario);
    }

    await UsuarioModel.insertMany(usuarios);
    console.log(`✅ ${cantidad} usuarios creados`);
    return usuarios;
  }

  /**
   * Crea categorías
   */
  static async crearCategorias() {
    console.log(`📂 Creando categorías...`);
    const categorias = [];

    for (const nombreCategoria of this.categorias) {
      const categoria = new CategoriaModel({
        nombre: nombreCategoria,
      });
      categorias.push(categoria);
    }

    await CategoriaModel.insertMany(categorias);
    console.log(`✅ ${categorias.length} categorías creadas`);
    return categorias;
  }

  /**
   * Crea productos mock
   */
  static async crearProductos(vendedores, categorias, cantidadAdicional = 100) {
    console.log(`📦 Creando productos...`);
    const productos = [];

    // Primero crear los productos base
    for (const productoBase of this.productosBase) {
      const vendedor = this.randomElement(
        vendedores.filter((u) => u.tipo === TIPO_USUARIO.VENDEDOR)
      );
      const categoria = categorias.find(
        (c) => c.nombre === productoBase.categoria
      );

      const producto = new ProductoModel({
        vendedor: vendedor._id,
        titulo: productoBase.titulo,
        descripcion: productoBase.descripcion,
        precio: productoBase.precio,
        moneda: MONEDA.PESO_ARG,
        activo: Math.random() > 0.1, // 90% activos
        categorias: [categoria._id],
        fotos: [
          `https://picsum.photos/seed/${Math.random()}/400/400`,
          `https://picsum.photos/seed/${Math.random()}/400/400`,
        ],
        stock: productoBase.stock,
        ventas: this.random(0, 100),
      });

      productos.push(producto);
    }

    // Crear productos adicionales variando los existentes
    for (let i = 0; i < cantidadAdicional; i++) {
      const productoBase = this.randomElement(this.productosBase);
      const vendedor = this.randomElement(
        vendedores.filter((u) => u.tipo === TIPO_USUARIO.VENDEDOR)
      );
      const categoria = categorias.find(
        (c) => c.nombre === productoBase.categoria
      );

      // Variar el precio un poco
      const variacionPrecio = 1 + (Math.random() - 0.5) * 0.4; // +/- 20%
      const precio = Math.round(productoBase.precio * variacionPrecio);

      // Variar el título con colores/tamaños/versiones
      const variantes = [
        "Pro",
        "Plus",
        "Premium",
        "Básico",
        "Edición Especial",
        "2024",
        "v2",
      ];
      const colores = ["Negro", "Blanco", "Azul", "Rojo", "Gris"];
      const titulo =
        Math.random() > 0.5
          ? `${productoBase.titulo} ${this.randomElement(variantes)}`
          : `${productoBase.titulo} - ${this.randomElement(colores)}`;

      const producto = new ProductoModel({
        vendedor: vendedor._id,
        titulo: titulo,
        descripcion: productoBase.descripcion,
        precio: precio,
        moneda: Math.random() > 0.8 ? MONEDA.DOLAR_USA : MONEDA.PESO_ARG,
        activo: Math.random() > 0.15, // 85% activos
        categorias: [categoria._id],
        fotos: [
          `https://picsum.photos/seed/${Math.random()}/400/400`,
          `https://picsum.photos/seed/${Math.random()}/400/400`,
          `https://picsum.photos/seed/${Math.random()}/400/400`,
        ],
        stock: this.random(0, 100),
        ventas: this.random(0, 150),
      });

      productos.push(producto);
    }

    await ProductoModel.insertMany(productos);
    console.log(`✅ ${productos.length} productos creados`);
    return productos;
  }

  /**
   * Genera una dirección de entrega
   */
  static generarDireccionEntrega() {
    return {
      calle: this.randomElement(this.calles),
      altura: String(this.random(100, 9999)),
      piso: Math.random() > 0.5 ? String(this.random(1, 20)) : undefined,
      departamento:
        Math.random() > 0.5 ? String(this.random(1, 50)) : undefined,
      codigoPostal: String(this.random(1000, 9999)),
      ciudad: this.randomElement(this.ciudades),
      provincia: this.randomElement(this.provincias),
      pais: "Argentina",
      latitud: -34.6037 + (Math.random() - 0.5) * 2,
      longitud: -58.3816 + (Math.random() - 0.5) * 2,
    };
  }

  /**
   * Crea pedidos mock
   */
  static async crearPedidos(compradores, productos, cantidad = 200) {
    console.log(`🛒 Creando ${cantidad} pedidos...`);
    const pedidos = [];
    const itemsPedidos = [];

    for (let i = 0; i < cantidad; i++) {
      const comprador = this.randomElement(
        compradores.filter(
          (u) =>
            u.tipo === TIPO_USUARIO.COMPRADOR || u.tipo === TIPO_USUARIO.ADMIN
        )
      );

      // Cantidad de items en el pedido (1-5)
      const cantidadItems = this.random(1, 5);
      const itemsIds = [];

      for (let j = 0; j < cantidadItems; j++) {
        const producto = this.randomElement(productos.filter((p) => p.activo));
        const cantidad = this.random(1, 3);

        const itemPedido = new ItemPedidoModel({
          producto: producto._id,
          cantidad: cantidad,
          precioUnitario: producto.precio,
        });

        itemsPedidos.push(itemPedido);
        itemsIds.push(itemPedido._id);
      }

      // Determinar estado del pedido
      const estados = [
        ESTADO_PEDIDO.PENDIENTE,
        ESTADO_PEDIDO.CONFIRMADO,
        ESTADO_PEDIDO.EN_PREPARACION,
        ESTADO_PEDIDO.ENVIADO,
        ESTADO_PEDIDO.ENTREGADO,
        ESTADO_PEDIDO.CANCELADO,
      ];

      // Más pedidos completados y menos cancelados
      const rand = Math.random();
      let estado;
      if (rand < 0.15) estado = ESTADO_PEDIDO.PENDIENTE;
      else if (rand < 0.25) estado = ESTADO_PEDIDO.CONFIRMADO;
      else if (rand < 0.35) estado = ESTADO_PEDIDO.EN_PREPARACION;
      else if (rand < 0.5) estado = ESTADO_PEDIDO.ENVIADO;
      else if (rand < 0.85) estado = ESTADO_PEDIDO.ENTREGADO;
      else estado = ESTADO_PEDIDO.CANCELADO;

      const historialEstados = [
        {
          estado: ESTADO_PEDIDO.PENDIENTE,
          usuario: comprador._id,
          motivo: "Pedido creado",
          createdAt: this.generarFechaAleatoria(180),
        },
      ];

      // Agregar más cambios de estado según el estado final
      if (estado !== ESTADO_PEDIDO.PENDIENTE) {
        if (estado === ESTADO_PEDIDO.CANCELADO) {
          historialEstados.push({
            estado: ESTADO_PEDIDO.CANCELADO,
            usuario: comprador._id,
            motivo: this.randomElement([
              "Cliente solicitó cancelación",
              "Producto sin stock",
              "Error en el pago",
              "Cambio de opinión del cliente",
            ]),
            createdAt: this.generarFechaAleatoria(150),
          });
        } else {
          if (
            estado === ESTADO_PEDIDO.CONFIRMADO ||
            estado === ESTADO_PEDIDO.EN_PREPARACION ||
            estado === ESTADO_PEDIDO.ENVIADO ||
            estado === ESTADO_PEDIDO.ENTREGADO
          ) {
            historialEstados.push({
              estado: ESTADO_PEDIDO.CONFIRMADO,
              usuario: comprador._id,
              motivo: "Pago confirmado",
              createdAt: this.generarFechaAleatoria(140),
            });
          }

          if (
            estado === ESTADO_PEDIDO.EN_PREPARACION ||
            estado === ESTADO_PEDIDO.ENVIADO ||
            estado === ESTADO_PEDIDO.ENTREGADO
          ) {
            historialEstados.push({
              estado: ESTADO_PEDIDO.EN_PREPARACION,
              usuario: comprador._id,
              motivo: "Pedido en preparación",
              createdAt: this.generarFechaAleatoria(130),
            });
          }

          if (
            estado === ESTADO_PEDIDO.ENVIADO ||
            estado === ESTADO_PEDIDO.ENTREGADO
          ) {
            historialEstados.push({
              estado: ESTADO_PEDIDO.ENVIADO,
              usuario: comprador._id,
              motivo: "Pedido despachado",
              createdAt: this.generarFechaAleatoria(120),
            });
          }

          if (estado === ESTADO_PEDIDO.ENTREGADO) {
            historialEstados.push({
              estado: ESTADO_PEDIDO.ENTREGADO,
              usuario: comprador._id,
              motivo: "Entrega completada",
              createdAt: this.generarFechaAleatoria(100),
            });
          }
        }
      }

      const pedido = new PedidoModel({
        comprador: comprador._id,
        moneda: MONEDA.PESO_ARG,
        direccionEntrega: this.generarDireccionEntrega(),
        items: itemsIds,
        estado: estado,
        historialEstados: historialEstados,
        createdAt: historialEstados[0].createdAt,
      });

      pedidos.push(pedido);
    }

    // Guardar items primero
    await ItemPedidoModel.insertMany(itemsPedidos);
    console.log(`✅ ${itemsPedidos.length} items de pedidos creados`);

    // Luego guardar pedidos
    await PedidoModel.insertMany(pedidos);
    console.log(`✅ ${pedidos.length} pedidos creados`);

    return pedidos;
  }

  /**
   * Ejecuta el seeding completo
   */
  static async ejecutarSeeding(opciones = {}) {
    const {
      limpiar = true,
      cantidadUsuarios = 50,
      cantidadProductosAdicionales = 100,
      cantidadPedidos = 200,
    } = opciones;

    console.log("🌱 Iniciando proceso de seeding...\n");

    try {
      // Limpiar base de datos si se solicita
      if (limpiar) {
        await this.limpiarBaseDatos();
      }

      // Crear usuarios
      const usuarios = await this.crearUsuarios(cantidadUsuarios);

      // Crear categorías
      const categorias = await this.crearCategorias();

      // Crear productos
      const vendedores = usuarios.filter(
        (u) => u.tipo === TIPO_USUARIO.VENDEDOR
      );
      if (vendedores.length === 0) {
        throw new Error("No se encontraron vendedores para crear productos");
      }
      const productos = await this.crearProductos(
        vendedores,
        categorias,
        cantidadProductosAdicionales
      );

      // Crear pedidos
      const compradores = usuarios.filter(
        (u) =>
          u.tipo === TIPO_USUARIO.COMPRADOR || u.tipo === TIPO_USUARIO.ADMIN
      );
      if (compradores.length === 0) {
        throw new Error("No se encontraron compradores para crear pedidos");
      }
      await this.crearPedidos(compradores, productos, cantidadPedidos);

      console.log("\n🎉 ¡Seeding completado exitosamente!");
      console.log("\n📊 Resumen:");
      console.log(`   - Usuarios: ${usuarios.length}`);
      console.log(`   - Categorías: ${categorias.length}`);
      console.log(`   - Productos: ${productos.length}`);
      console.log(`   - Pedidos: ${cantidadPedidos}`);

      return {
        usuarios,
        categorias,
        productos,
      };
    } catch (error) {
      console.error("❌ Error durante el seeding:", error);
      throw error;
    }
  }
}
