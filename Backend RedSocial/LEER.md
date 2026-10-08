# 🚀 Taller Backend: Red Social "Beat Social"

Bienvenido al taller de desarrollo de APIs con Node.js y MySQL. Este proyecto ya cuenta con un sistema de inicialización automática para que te enfoques en programar los controladores y rutas.

## 📋 Requisitos Previos
1. Tener instalado **Node.js** (versión 24 o superior).
2. Tener activo **XAMPP** o un servidor MySQL local.
3. Modificar el archivo llamado `.env` en la raíz con tus credenciales de ser necesario de MySQL (User, Password, Host).:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   PORT=3000

## 🛠️ Configuración Rápida
1. **abrir la consola CMD**
2. **Dependencias**: Ejecuta `npm install`.
3. **Preparar la base de datos**: Desde la carpeta `Backend RedSocial`, ejecuta `npm run setup-db`. Este comando crea las tablas faltantes sin borrar la base de datos ni sus datos.
4. **Ejecutar la API**: Ejecuta `npm run dev`. La API estará disponible en `http://localhost:3000` (o en el puerto configurado con `PORT`).
5. **Iniciar el frontend**: Desde la carpeta del frontend, ejecuta `npm run dev`. El formulario se conecta por defecto a `http://localhost:3000`; puedes cambiarlo con `VITE_API_URL`.

MySQL usa normalmente el puerto `3306`; ese puerto es para la base de datos, no para la API.

La pantalla **Buscar personas y grupos** consume `GET /api/usuarios/buscar?termino=...` y `GET /api/grupos?buscar=...`. Las búsquedas requieren al menos 2 caracteres.