# Tienda Sol — Plataforma de Comercio Electrónico (TP DDS UTN FRBA 2C 2025)

**Tienda Sol** es una plataforma web de e-commerce donde **vendedores** pueden publicar productos, gestionar stock y pedidos, y **compradores** pueden explorar el catálogo, buscar/filtrar, agregar al carrito y realizar compras. Incluye un sistema de **notificaciones** para eventos relevantes (pedido creado, enviado, cancelado).

Demo (frontend): https://tiendasollis.netlify.app/

## Repositorio
Este proyecto es un **monorepo** con **frontend** y **backend** gestionados con **npm workspaces**.

```text
.
├── packages/
│   ├── backend/        # API REST (Express)
│   └── frontend/       # UI web (React)
├── package.json        # Configuración del monorepo
└── README.md
```

## Funcionalidades
- **Búsqueda y visualización de productos** con filtros (texto/categoría/descripción), rango de precios, paginación y ordenamiento.
- **Carrito** del lado del cliente (agregar/quitar, totales).
- **Gestión de pedidos**: crear pedido validando stock, cancelar antes de envío, historial, marcado como enviado.
- **Notificaciones**: pedido confirmado, pedido enviado y cancelación; bandeja de leídas/no leídas y marcar como leída.
- Roles: **comprador / vendedor / admin** (según implementación del equipo).

## Tech stack
- Frontend: React (Create React App)
- Backend: Node.js + Express
- Base de datos: MongoDB
- Testing: Jest (unit/integration) y E2E (según entrega)
- Documentación API: Swagger/OpenAPI (recomendado por la cátedra)

## Branches
- `main`: **versión final** del proyecto.
- Branches `entrega_*` / ramas por feature: checkpoints/hitos durante la cursada.

## Inicio rápido (local)

### Requisitos
- Node.js + npm
- MongoDB en ejecución (local o Atlas)

### 1) Instalar dependencias
Desde la raíz del monorepo:
```bash
npm install
```

### 2) Variables de entorno

#### Backend
Crear `packages/backend/.env` (podés partir de `packages/backend/.env.example`):
```env
SERVER_PORT=8000
ALLOWED_ORIGINS=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=tiendasol
JWT_SECRET=changeme
```
*Si usás Atlas, MONGODB_URI va a ser tu connection string.*

#### Frontend
Crear `packages/frontend/.env` (podés partir de `packages/frontend/.env.example`):
```env
REACT_APP_API_URL=http://localhost:8000
```

### 3) Ejecutar
#### Backend
```bash
npm run start:backend
```

Modo desarrollo (reinicio automático):
```bash
npm run dev:backend
```

#### Frontend
```bash
npm run start:frontend
```

#### Ambos (desarrollo)
```bash
npm run start:dev
```

### 4) Poblar la base de datos (Seeder)
El proyecto incluye un seeder para cargar datos de prueba.
```bash
cd packages/backend
npm run seed
```
Crea (aprox.):
- 50 usuarios (compradores, vendedores y admins)
- 18 categorías
- ~160 productos con stock
- 200 pedidos con diferentes estados

Opciones:
```bash
npm run seed:keep
node scripts/seed.js --usuarios=100 --productos=200 --pedidos=500
node scripts/seed.js --help
```

## Créditos
Trabajo Práctico Integrador — Desarrollo de Software (DDS) — Ingeniería en Sistemas — UTN FRBA — 2C 2025.
