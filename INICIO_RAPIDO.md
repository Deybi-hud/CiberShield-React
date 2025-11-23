# 🚀 Inicio Rápido - CiberShield Frontend

## Primeros Pasos (5 minutos)

### 1. Configuración de Entorno
Crea un archivo `.env.local` en la raíz del proyecto:

```
VITE_API_URL=https://snake-pc-api.onrender.com/api/v1
```

Para desarrollo local (si el backend corre en localhost):
```
VITE_API_URL=http://localhost:3000/api/v1
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Ejecutar en Desarrollo
```bash
npm run dev
```

Abre tu navegador: **http://localhost:5173**

---

## URLs Principales

| Rol | URLs |
|-----|------|
| **Público** | `/` (home), `/login`, `/registro` |
| **Cliente** | `/cliente/perfil`, `/cliente/pedidos` |
| **Admin** | `/admin/dashboard`, `/admin/productos`, `/admin/usuarios`, `/admin/pedidos` |

---

## Usuarios de Prueba

Depende de los usuarios que hayas creado en el backend. Ejemplo:

**Admin:**
- Email: `admin@cibershield.com`
- Password: `admin123`
- Rol: `admin`

**Cliente:**
- Email: `cliente@cibershield.com`
- Password: `cliente123`
- Rol: `cliente`

---

## Estructura de Carpetas

```
src/
├── config/              # Configuración de API
├── services/            # Servicios HTTP
│   ├── login/          # Autenticación
│   ├── publico/        # Productos, ubicaciones
│   ├── cliente/        # Perfil, pedidos
│   └── admin/          # Gestión admin
├── pages/              # Páginas principales
│   ├── cliente/        # Vistas de cliente
│   └── admin/          # Vistas de admin
├── components/         # Componentes reutilizables
├── styles/            # Estilos CSS
├── context/           # Context API
└── App.jsx            # Ruteador principal
```

---

## Características Incluidas

✅ Autenticación con JWT
✅ Servicios centralizados con Axios
✅ Vistas de cliente (Perfil, Pedidos)
✅ Vistas de administrador (Dashboard, CRUD)
✅ Protección de rutas
✅ Manejo de errores
✅ Diseño responsive
✅ Tema consistente

---

## Documentación

- **`API_SETUP.md`** - Documentación completa de servicios
- **`VISTAS.md`** - Documentación de vistas y componentes
- **`FRONTEND_SETUP.md`** - Guía detallada de configuración
- **`IMPLEMENTACION_COMPLETA.md`** - Resumen completo de todo

---

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint

# Tests
npm test
npm run test:watch
```

---

## Errores Comunes

### "Module not found"
```bash
npm install
```

### API no responde
- Verifica `.env.local` tiene la URL correcta
- Asegúrate que el backend está corriendo
- Revisa la consola para errores de CORS

### Ruta protegida redirige a login
- Necesitas hacer login primero
- Verifica que el usuario tenga el rol correcto

---

## Próximo Paso

Lee **`IMPLEMENTACION_COMPLETA.md`** para documentación completa.

¡Listo para desarrollar! 🎉
