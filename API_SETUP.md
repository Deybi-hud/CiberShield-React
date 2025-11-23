# Configuración Backend - Frontend

## Configuración de Variables de Entorno

### 1. Crear archivo `.env.local`
En la raíz del proyecto, crea un archivo `.env.local` con las siguientes variables:

```bash
# Backend API Configuration
VITE_API_URL=https://snake-pc-api.onrender.com/api/v1
```

**Nota**: Si tu backend está en local durante desarrollo:
```bash
VITE_API_URL=http://localhost:3000/api/v1
```

## Estructura de Servicios

### Servicios Públicos (`src/services/publico/`)
- **ProductoService**: Obtener productos públicos
- **UbicacionService**: Obtener ubicaciones/ciudades

### Servicios de Autenticación (`src/services/login/`)
- **AuthService**: Login, registro, autenticación

### Servicios de Cliente (`src/services/cliente/`)
- **PerfilService**: Gestionar perfil del usuario
- **PedidoService**: Gestionar pedidos del usuario
- **PagoService**: Procesar pagos

### Servicios de Admin (`src/services/admin/`)
- **AdminProductoService**: CRUD de productos
- **AdminUsuarioService**: CRUD de usuarios
- **AdminUbicacionService**: CRUD de ubicaciones
- **AdminPedidoService**: Gestión de pedidos
- **AdminRolService**: Gestión de roles
- **DashboardService**: Estadísticas y reportes

## Usando los Servicios

### Ejemplo: Obtener Productos
```jsx
import ProductosService from '@/services/publico/ProductoService';

// En un componente
const [productos, setProductos] = useState([]);

useEffect(() => {
  ProductosService.getAll()
    .then(data => setProductos(data))
    .catch(error => console.error(error));
}, []);
```

### Ejemplo: Login
```jsx
import AuthService from '@/services/login/AuthService';

const handleLogin = async (email, password) => {
  try {
    const response = await AuthService.login(email, password);
    console.log('Usuario autenticado:', response.usuario);
    // Redirigir al home o dashboard
  } catch (error) {
    console.error('Error de login:', error.response?.data?.mensaje);
  }
};
```

### Ejemplo: Crear Pedido
```jsx
import PedidoService from '@/services/cliente/PedidoService';

const handleCrearPedido = async (datos) => {
  try {
    const pedido = await PedidoService.create({
      items: [
        { productoId: 1, cantidad: 2, precio: 50 }
      ],
      direccion: '...',
      telefono: '...',
      metodoPago: 'tarjeta'
    });
    console.log('Pedido creado:', pedido.id);
  } catch (error) {
    console.error('Error al crear pedido:', error);
  }
};
```

## Manejo de Autenticación

### Token JWT
El token se almacena automáticamente en `localStorage` después del login. Se incluye en todas las solicitudes mediante un interceptor de axios.

### Verificar Autenticación
```jsx
import AuthService from '@/services/login/AuthService';

// En un componente
if (AuthService.isAutenticado()) {
  const usuario = AuthService.getUsuarioActual();
  console.log('Usuario autenticado:', usuario);
}
```

### Logout
```jsx
await AuthService.logout();
// El usuario será redirigido a /login automáticamente
```

## Estructura de Respuestas API Esperadas

### Respuesta Exitosa (Login)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "id": 1,
    "nombre": "Juan",
    "email": "juan@example.com",
    "rol": "cliente"
  }
}
```

### Respuesta Exitosa (Productos)
```json
{
  "data": [
    {
      "id": 1,
      "nombre": "Llave de Seguridad",
      "descripcion": "...",
      "precio": 50,
      "stock": 10
    }
  ],
  "total": 1,
  "pagina": 1,
  "paginas": 1
}
```

### Respuesta de Error
```json
{
  "error": true,
  "mensaje": "Credenciales inválidas",
  "codigo": 401
}
```

## Endpoints Disponibles

Ver `/src/config/api.js` para la lista completa de endpoints configurados.

### Rutas Principales:
- `GET /productos` - Obtener todos los productos
- `POST /auth/login` - Login
- `POST /auth/registro` - Registro de usuario
- `GET /pedidos` - Obtener pedidos del usuario
- `POST /pedidos` - Crear nuevo pedido
- `POST /pagos` - Procesar pago
- `GET /usuarios/perfil` - Obtener perfil del usuario
- `PUT /usuarios/perfil` - Actualizar perfil

### Rutas Admin:
- `GET /admin/usuarios` - Listar usuarios
- `GET /admin/productos` - Listar productos (vista admin)
- `GET /admin/pedidos` - Listar todos los pedidos
- `GET /admin/dashboard/estadisticas` - Estadísticas

## Manejo de Errores

```jsx
try {
  const datos = await ProductosService.getAll();
} catch (error) {
  if (error.response?.status === 401) {
    console.error('No autorizado');
  } else if (error.response?.status === 404) {
    console.error('Recurso no encontrado');
  } else if (error.response?.status === 500) {
    console.error('Error del servidor');
  } else {
    console.error('Error:', error.message);
  }
}
```

## Testing Local con Backend

Si necesitas testear con tu backend local:

1. Asegúrate que tu backend corra en `http://localhost:3000`
2. Crea `.env.local` con:
   ```bash
   VITE_API_URL=http://localhost:3000/api/v1
   ```
3. Ejecuta: `npm run dev`

## Notas Importantes

- Los tokens de autenticación se incluyen automáticamente en todas las solicitudes
- Si el token expire (401), se redirige automáticamente a `/login`
- Todos los servicios retornan promesas que pueden ser manejadas con `.then()/.catch()` o `async/await`
- Los errores siempre contienen información útil en `error.response.data`
