# Configuración Completa del Frontend - CiberShield

## Resumen de Cambios

El frontend de CiberShield ha sido completamente configurado con:

✅ **Configuración centralizada de API**
✅ **Servicios HTTP con interceptores**
✅ **Autenticación con JWT**
✅ **Vistas de Cliente (Perfil, Pedidos)**
✅ **Vistas de Administrador (Dashboard, Productos, Usuarios, Pedidos)**
✅ **Sistema de rutas protegidas**
✅ **Estilos consistentes con Atomic Design**

---

## Estructura de Archivos Creados

### Configuración de API
```
src/config/
├── api.js                      # Endpoints centralizados
└── axiosInstance.js            # Cliente HTTP con interceptores
```

### Servicios
```
src/services/
├── login/
│   └── AuthService.jsx         # Autenticación
├── publico/
│   ├── ProductoService.jsx     # Productos públicos
│   └── UbicacionService.jsx    # Ubicaciones
├── cliente/
│   ├── PerfilService.jsx       # Perfil del usuario
│   ├── PedidoService.jsx       # Pedidos
│   └── PagoService.jsx         # Pagos
└── admin/
    ├── AdminProductoService.jsx   # Productos (admin)
    ├── AdminUsuarioService.jsx    # Usuarios (admin)
    ├── AdminUbicacionService.jsx  # Ubicaciones (admin)
    ├── AdminPedidoService.jsx     # Pedidos (admin)
    ├── AdminRolService.jsx        # Roles (admin)
    └── DashboardService.jsx       # Dashboard (admin)
```

### Páginas (Pages)
```
src/pages/
├── cliente/
│   ├── ClientePerfil.jsx       # Perfil del cliente
│   └── ClientePedidos.jsx      # Pedidos del cliente
└── admin/
    ├── AdminDashboard.jsx      # Dashboard
    ├── AdminProductos.jsx      # Gestión de productos
    ├── AdminUsuarios.jsx       # Gestión de usuarios
    └── AdminPedidos.jsx        # Gestión de pedidos
```

### Componentes
```
src/components/
└── ProtectedRoute.jsx          # Protección de rutas
```

### Estilos
```
src/styles/pages/
├── Cliente.css                 # Estilos vistas cliente
└── Admin.css                   # Estilos vistas admin
```

### Configuración
```
.env.example                    # Template de variables de entorno
.env.local                      # Variables locales (crear)
API_SETUP.md                    # Documentación de API
VISTAS.md                       # Documentación de vistas
FRONTEND_SETUP.md               # Este archivo
```

---

## Configuración Inicial

### 1. Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Backend API Configuration
VITE_API_URL=https://snake-pc-api.onrender.com/api/v1
```

Para desarrollo local:
```bash
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

El sitio estará disponible en: `http://localhost:5173`

---

## Flujo de Usuario

### Registro/Login
1. Usuario va a `/login` o `/registro`
2. Completa el formulario
3. Se envía solicitud a `POST /auth/login` o `POST /auth/registro`
4. Backend retorna token JWT y datos del usuario
5. Token se almacena en localStorage
6. Usuario es redirigido a `/` (home)

### Como Cliente
1. Accede a `/cliente/perfil` para editar información
2. Accede a `/cliente/pedidos` para ver historial
3. Puede cancelar pedidos pendientes
4. Puede logout desde cualquier página

### Como Administrador
1. Accede a `/admin/dashboard` para ver estadísticas
2. Gestiona productos en `/admin/productos`
3. Gestiona usuarios en `/admin/usuarios`
4. Cambia estado de pedidos en `/admin/pedidos`
5. Todas las acciones están protegidas por rol

---

## Principales Características

### 1. Autenticación
- **Token JWT** almacenado en localStorage
- **Interceptores** que agregan token automáticamente
- **Redireccionamiento** automático al expirar token
- **Logout** seguro que limpia localStorage

### 2. Servicios Centralizados
- **axiosInstance**: Cliente HTTP configurado
- **API_ENDPOINTS**: URLs centralizadas
- **Manejo de errores**: Captura consistente
- **Métodos reutilizables**: Para todas las operaciones CRUD

### 3. Protección de Rutas
```jsx
<ProtectedRoute>              {/* Solo autenticado */}
  <ClientePerfil />
</ProtectedRoute>

<ProtectedRoute requiredRole="admin">  {/* Solo admin */}
  <AdminDashboard />
</ProtectedRoute>
```

### 4. Responsive Design
- Diseño adaptativo para móviles (768px)
- Sidebar colapsible
- Tablas ajustables
- Componentes flexibles

### 5. Estilos Consistentes
- Variables CSS centralizadas
- Tema oscuro/claro consistente
- Iconos Bootstrap Icons
- Animaciones suaves

---

## Endpoints de la API

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/registro` - Registro de usuario
- `POST /auth/logout` - Cerrar sesión
- `POST /auth/refresh` - Refrescar token

### Productos
- `GET /productos` - Listar todos
- `GET /productos/:id` - Obtener uno
- `POST /productos` - Crear (admin)
- `PUT /productos/:id` - Actualizar (admin)
- `DELETE /productos/:id` - Eliminar (admin)

### Pedidos (Cliente)
- `GET /pedidos` - Mis pedidos
- `GET /pedidos/:id` - Detalle de pedido
- `POST /pedidos` - Crear pedido
- `POST /pedidos/:id/cancelar` - Cancelar

### Perfil
- `GET /usuarios/perfil` - Obtener perfil
- `PUT /usuarios/perfil` - Actualizar perfil
- `POST /usuarios/perfil/password` - Cambiar password

### Admin
- `GET /admin/usuarios` - Listar usuarios
- `POST /admin/usuarios` - Crear usuario
- `PUT /admin/usuarios/:id` - Actualizar usuario
- `DELETE /admin/usuarios/:id` - Eliminar usuario

- `GET /admin/productos` - Listar productos
- `POST /admin/productos` - Crear producto
- `PUT /admin/productos/:id` - Actualizar
- `DELETE /admin/productos/:id` - Eliminar

- `GET /admin/pedidos` - Listar pedidos
- `PUT /admin/pedidos/:id/estado` - Cambiar estado

- `GET /admin/dashboard/estadisticas` - Estadísticas
- `GET /admin/dashboard/ventas` - Datos de ventas
- `GET /admin/dashboard/productos-populares` - Top productos

---

## Uso de Servicios en Componentes

### Cargar Productos
```jsx
import ProductosService from '@/services/publico/ProductoService';

useEffect(() => {
  ProductosService.getAll()
    .then(data => setProductos(data))
    .catch(err => console.error(err));
}, []);
```

### Login
```jsx
import AuthService from '@/services/login/AuthService';

const handleLogin = async (email, password) => {
  try {
    await AuthService.login(email, password);
    navigate('/');
  } catch (error) {
    setError(error.response?.data?.mensaje);
  }
};
```

### Crear Pedido
```jsx
import PedidoService from '@/services/cliente/PedidoService';

const handleCrearPedido = async (datos) => {
  try {
    const pedido = await PedidoService.create(datos);
    console.log('Pedido creado:', pedido.id);
  } catch (error) {
    setError('Error al crear pedido');
  }
};
```

### Gestionar Productos (Admin)
```jsx
import AdminProductoService from '@/services/admin/AdminProductoService';

// Crear
await AdminProductoService.create({ nombre, precio, stock });

// Actualizar
await AdminProductoService.update(id, { nombre, precio });

// Eliminar
await AdminProductoService.delete(id);
```

---

## Manejo de Errores

Todos los servicios lanzan excepciones con estructura:
```javascript
error.response?.status      // Código HTTP
error.response?.data?.mensaje  // Mensaje de error
error.message               // Error genérico
```

Ejemplo:
```jsx
try {
  await AuthService.login(email, password);
} catch (error) {
  if (error.response?.status === 401) {
    console.log('Credenciales inválidas');
  } else if (error.response?.status === 404) {
    console.log('Usuario no encontrado');
  } else {
    console.log('Error del servidor');
  }
}
```

---

## Próximos Pasos Recomendados

1. **Integración de Pagos**
   - Stripe/PayPal en `PagoService`
   - Vista de checkout

2. **Notificaciones**
   - Toasts/Alerts
   - Confirmaciones de acciones

3. **Búsqueda Avanzada**
   - Filtros en productos
   - Búsqueda por categoría

4. **Reportes (Admin)**
   - Exportar datos
   - Gráficas de ventas

5. **Optimizaciones**
   - Caché de datos
   - Lazy loading de imágenes
   - Paginación de tablas

6. **Testing**
   - Tests unitarios
   - Tests de integración
   - Tests E2E

---

## Troubleshooting

### Token no se guarda
- Verifica que localStorage no esté deshabilitado
- Revisa la consola para errores de CORS

### Rutas protegidas no funcionan
- Asegúrate que el usuario tenga el rol correcto
- Verifica que el token sea válido
- Limpia localStorage y vuelve a hacer login

### API no responde
- Verifica que VITE_API_URL sea correcto en .env.local
- Asegúrate que el backend esté corriendo
- Revisa CORS en el backend

### Estilos no cargan
- Limpia caché del navegador (Ctrl+Shift+R)
- Reconstruye el proyecto: `npm run build`
- Verifica que CSS esté correctamente importado

---

## Documentación Adicional

- Ver `API_SETUP.md` para documentación de servicios
- Ver `VISTAS.md` para documentación de componentes
- Ver `README.md` para información general del proyecto

---

## Contacto y Soporte

Para preguntas o problemas con la configuración:
1. Revisa la documentación
2. Verifica los logs del navegador
3. Consulta la documentación del backend
