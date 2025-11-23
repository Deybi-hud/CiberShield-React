# Estructura del Proyecto CiberShield

## Árbol Completo del Proyecto

```
CiberShield-React/
│
├── 📁 public/                          # Archivos públicos estáticos
│   └── assets/                        # Imágenes, iconos
│
├── 📁 src/                            # Código fuente
│   │
│   ├── 📁 config/                    # Configuración centralizada
│   │   ├── api.js                   # Endpoints de API
│   │   └── axiosInstance.js         # Cliente HTTP
│   │
│   ├── 📁 services/                 # Servicios HTTP
│   │   ├── 📁 login/                # Autenticación
│   │   │   └── AuthService.jsx
│   │   │
│   │   ├── 📁 publico/              # Servicios públicos
│   │   │   ├── ProductoService.jsx
│   │   │   └── UbicacionService.jsx
│   │   │
│   │   ├── 📁 cliente/              # Servicios de cliente
│   │   │   ├── PerfilService.jsx
│   │   │   ├── PedidoService.jsx
│   │   │   └── PagoService.jsx
│   │   │
│   │   └── 📁 admin/                # Servicios de admin
│   │       ├── AdminProductoService.jsx
│   │       ├── AdminUsuarioService.jsx
│   │       ├── AdminUbicacionService.jsx
│   │       ├── AdminPedidoService.jsx
│   │       ├── AdminRolService.jsx
│   │       └── DashboardService.jsx
│   │
│   ├── 📁 pages/                    # Páginas principales
│   │   ├── Home.jsx                 # Home público
│   │   ├── Carrito.jsx              # Carrito de compras
│   │   ├── Login.jsx                # Login
│   │   ├── Register.jsx             # Registro
│   │   ├── ProductDetail.jsx        # Detalle de producto
│   │   │
│   │   ├── 📁 cliente/              # Vistas de cliente
│   │   │   ├── ClientePerfil.jsx    # Mi perfil
│   │   │   └── ClientePedidos.jsx   # Mis pedidos
│   │   │
│   │   └── 📁 admin/                # Vistas de admin
│   │       ├── AdminDashboard.jsx   # Dashboard
│   │       ├── AdminProductos.jsx   # Gestión productos
│   │       ├── AdminUsuarios.jsx    # Gestión usuarios
│   │       └── AdminPedidos.jsx     # Gestión pedidos
│   │
│   ├── 📁 components/               # Componentes reutilizables
│   │   │
│   │   ├── 📁 atoms/                # Componentes básicos
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Text.jsx
│   │   │   ├── Image.jsx
│   │   │   ├── Link.jsx
│   │   │   ├── List.jsx
│   │   │   └── ListItem.jsx
│   │   │
│   │   ├── 📁 molecules/            # Componentes compuestos
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CartItem.jsx
│   │   │   └── SearchBar.jsx
│   │   │
│   │   ├── 📁 organisms/            # Componentes complejos
│   │   │   ├── LoginCard.jsx
│   │   │   ├── RegisterCard.jsx
│   │   │   ├── NavMenu.jsx
│   │   │   ├── NavCarrito.jsx
│   │   │   ├── MainHome.jsx
│   │   │   ├── SidebarHome.jsx
│   │   │   ├── MainCarrito.jsx
│   │   │   ├── SidebarCarrito.jsx
│   │   │   └── MainProductDetail.jsx
│   │   │
│   │   ├── 📁 templates/            # Plantillas de página
│   │   │   └── Wrapper.jsx
│   │   │
│   │   └── ProtectedRoute.jsx        # Protección de rutas
│   │
│   ├── 📁 styles/                   # Estilos CSS
│   │   ├── 📁 atoms/
│   │   │   ├── Button.css
│   │   │   ├── Input.css
│   │   │   └── ...
│   │   │
│   │   ├── 📁 molecules/
│   │   │   ├── Header.css
│   │   │   ├── Footer.css
│   │   │   └── ...
│   │   │
│   │   ├── 📁 organisms/
│   │   │   └── ...
│   │   │
│   │   ├── 📁 pages/
│   │   │   ├── Home.css
│   │   │   ├── Carrito.css
│   │   │   ├── Login.css
│   │   │   ├── Cliente.css         # Estilos cliente
│   │   │   └── Admin.css           # Estilos admin
│   │   │
│   │   ├── 📁 templates/
│   │   │   └── Wrapper.css
│   │   │
│   │   ├── Global.css               # Estilos globales
│   │   └── Utils.css                # Utilidades CSS
│   │
│   ├── 📁 context/                  # Context API
│   │   └── CarritoContext.jsx       # Estado del carrito
│   │
│   ├── 📁 test/                     # Tests
│   │   ├── 📁 components/
│   │   ├── 📁 pages/
│   │   └── example.spec.jsx
│   │
│   ├── App.jsx                      # Componente principal
│   ├── main.jsx                     # Punto de entrada
│   │
│
├── 📄 index.html                     # HTML principal
├── 📄 package.json                  # Dependencias
├── 📄 package-lock.json             # Lock de dependencias
├── 📄 vite.config.js                # Config de Vite
├── 📄 eslint.config.js              # Config de ESLint
├── 📄 babel.config.cjs              # Config de Babel
├── 📄 karma.conf.cjs                # Config de Karma (testing)
│
├── 📄 .env.example                  # Template de variables
├── 📄 .env.local                    # Variables locales (crear)
├── 📄 .gitignore                    # Archivos ignorados
│
├── 📄 README.md                     # Documentación principal
├── 📄 INICIO_RAPIDO.md              # Guía de 5 minutos
├── 📄 API_SETUP.md                  # Documentación de API
├── 📄 VISTAS.md                     # Documentación de vistas
├── 📄 FRONTEND_SETUP.md             # Guía de configuración
├── 📄 IMPLEMENTACION_COMPLETA.md    # Resumen completo
├── 📄 ESTRUCTURA_PROYECTO.md        # Este archivo
└── 📄 RESUMEN_IMPLEMENTACION.txt    # Resumen ejecutivo

```

---

## Descripción de Carpetas Principales

### `src/config/`
Configuración centralizada del proyecto:
- **api.js** - Define todos los endpoints de la API
- **axiosInstance.js** - Cliente HTTP con interceptores automáticos

### `src/services/`
Servicios HTTP organizados por funcionalidad:
- **login/** - Autenticación y manejo de sesiones
- **publico/** - Servicios accesibles sin autenticación
- **cliente/** - Servicios específicos del cliente
- **admin/** - Servicios de administración

### `src/pages/`
Páginas principales del sitio:
- Raíz: Páginas públicas
- **cliente/** - Vistas específicas para clientes
- **admin/** - Vistas específicas para administradores

### `src/components/`
Componentes reutilizables siguiendo Atomic Design:
- **atoms/** - Componentes más pequeños (Button, Input, Text)
- **molecules/** - Combinaciones de atoms (LoginForm, ProductCard)
- **organisms/** - Componentes complejos (LoginCard, NavMenu)
- **templates/** - Plantillas de página (Wrapper)

### `src/styles/`
Estilos CSS organizados por componente:
- Cada componente tiene su CSS correspondiente
- Global.css para estilos globales
- Utils.css para utilidades

### `src/context/`
Estado global con Context API:
- **CarritoContext.jsx** - Gestión del carrito de compras

### `src/test/`
Tests unitarios e integración (Jasmine/Karma):
- Tests para componentes
- Tests para páginas

---

## Flujo de Importes Comunes

```javascript
// Importar servicios
import AuthService from '@/services/login/AuthService';
import ProductosService from '@/services/publico/ProductoService';
import AdminProductoService from '@/services/admin/AdminProductoService';

// Importar componentes
import ProtectedRoute from '@/components/ProtectedRoute';
import Button from '@/components/atoms/Button';

// Importar contextos
import { useCarrito } from '@/context/CarritoContext';

// Importar páginas
import ClientePerfil from '@/pages/cliente/ClientePerfil';
```

---

## Patrones de Carpetas

### Servicios
```
services/
├── [módulo]/
│   └── [Nombre]Service.jsx
```
Ejemplo: `services/login/AuthService.jsx`

### Páginas
```
pages/
├── [Nombre].jsx              # Página pública
└── [rol]/
    └── [Rol][Nombre].jsx    # Página protegida
```
Ejemplo: `pages/cliente/ClientePerfil.jsx`

### Componentes
```
components/
├── [tipo]/
│   └── [Nombre].jsx         # Componente
└── [tipo]/
    └── [nombre].css         # Estilos
```
Ejemplo: `components/atoms/Button.jsx` y `Button.css`

---

## Rutas Clave

| Ubicación | Propósito |
|-----------|-----------|
| `src/config/` | Configuración centralizada |
| `src/services/` | Todas las llamadas a API |
| `src/pages/` | Vistas principales (routing) |
| `src/components/` | Componentes reutilizables |
| `src/styles/` | Estilos CSS |
| `src/context/` | Estado global |

---

## Dónde Agregar

### Nuevo Servicio
Crea en `src/services/[módulo]/[Nombre]Service.jsx`

### Nueva Página Pública
Crea en `src/pages/[Nombre].jsx` y agrega ruta en `App.jsx`

### Nueva Página de Cliente
Crea en `src/pages/cliente/Cliente[Nombre].jsx` con `ProtectedRoute`

### Nueva Página de Admin
Crea en `src/pages/admin/Admin[Nombre].jsx` con `ProtectedRoute requiredRole="admin"`

### Nuevo Componente
Crea en `src/components/[tipo]/[Nombre].jsx` y CSS asociado

### Nuevos Estilos Globales
Agrega a `src/styles/Global.css`

---

## Alias de Importes (si lo deseas agregar)

Puedes agregar alias en `vite.config.js`:
```javascript
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

Entonces puedes importar como:
```javascript
import Button from '@/components/atoms/Button';
```

---

## Árbol de Dependencias

```
App.jsx
├── Rutas públicas
│   ├── Home
│   ├── Carrito
│   ├── Login
│   ├── Register
│   └── ProductDetail
│
├── Rutas Cliente (con ProtectedRoute)
│   ├── ClientePerfil
│   └── ClientePedidos
│
└── Rutas Admin (con ProtectedRoute requiredRole="admin")
    ├── AdminDashboard
    ├── AdminProductos
    ├── AdminUsuarios
    └── AdminPedidos
```

---

## Convenciones del Proyecto

1. **Nombres de archivo**: PascalCase para componentes, camelCase para utilidades
2. **Importes**: Ordenados por módulo (React, librerías, local)
3. **Componentes**: Functional components con hooks
4. **Servicios**: Clases con métodos async
5. **Estilos**: CSS puro, variables CSS para colores
6. **Rutas**: `/ruta-publica`, `/cliente/ruta`, `/admin/ruta`

---

## Próxima Lectura

- Comienza con **INICIO_RAPIDO.md** (5 minutos)
- Lee **IMPLEMENTACION_COMPLETA.md** (detalles completos)
- Consulta **API_SETUP.md** (cómo usar servicios)
- Revisa **VISTAS.md** (documentación de componentes)

