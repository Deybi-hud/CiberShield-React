# Guía de Vistas - CiberShield

## Estructura de Vistas

El frontend cuenta con tres tipos de vistas principales: Públicas, Cliente y Administrador.

### Vistas Públicas
- **Home** (`/`) - Catálogo de productos
- **Detalle de Producto** (`/producto/:id`) - Información detallada de un producto
- **Carrito** (`/carrito`) - Carrito de compras
- **Login** (`/login`) - Inicio de sesión
- **Registro** (`/registro`) - Registro de nuevos usuarios

### Vistas Cliente
Disponibles solo para usuarios autenticados con rol `cliente`

- **Mi Perfil** (`/cliente/perfil`) - Gestión de perfil personal
- **Mis Pedidos** (`/cliente/pedidos`) - Historial y seguimiento de pedidos

### Vistas Admin
Disponibles solo para usuarios autenticados con rol `admin`

- **Dashboard** (`/admin/dashboard`) - Panel de control y estadísticas
- **Gestión de Productos** (`/admin/productos`) - CRUD de productos
- **Gestión de Usuarios** (`/admin/usuarios`) - CRUD de usuarios
- **Gestión de Pedidos** (`/admin/pedidos`) - Cambio de estado de pedidos

## Componentes Utilizados

### Atomic Design
El proyecto sigue la metodología Atomic Design:

- **Atoms**: Componentes pequeños (Button, Input, Text, Image, Link, List, ListItem)
- **Molecules**: Componentes compuestos (LoginForm, RegisterForm, Header, Footer, ProductCard, CartItem, SearchBar)
- **Organisms**: Componentes complejos (LoginCard, RegisterCard, NavMenu, NavCarrito, MainHome, SidebarHome, MainCarrito, SidebarCarrito, MainProductDetail)
- **Templates**: Estructura de página (Wrapper)

## Protección de Rutas

Se utiliza el componente `ProtectedRoute` para proteger las rutas:

```jsx
<ProtectedRoute>
  <ClientePerfil />
</ProtectedRoute>

<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>
```

- Sin parámetro `requiredRole`: Requiere que el usuario esté autenticado
- Con `requiredRole="admin"`: Solo accesible para administradores
- Si no está autenticado: Redirige a `/login`
- Si no tiene rol requerido: Redirige a `/`

## Características de las Vistas

### Vistas Cliente

#### Mi Perfil
- Visualización y edición de información personal
- Campos: nombre, apellido, email, teléfono, dirección, ciudad
- Botones de editar/guardar
- Logout seguro

#### Mis Pedidos
- Listado de todos los pedidos del usuario
- Estado de cada pedido (Pendiente, Procesando, Enviado, Entregado, Cancelado)
- Detalles: ID, fecha, total, artículos
- Opción para cancelar pedidos activos
- Opción para ver detalle completo

### Vistas Admin

#### Dashboard
- **Estadísticas principales**:
  - Total de usuarios
  - Total de productos
  - Total de pedidos
  - Ventas totales
  - Pedidos pendientes
  - Ventas de hoy
  - Productos sin stock
  - Ticket promedio

#### Gestión de Productos
- **Tabla de productos** con búsqueda
- **Acciones**:
  - Crear nuevo producto
  - Editar producto
  - Eliminar producto
- **Modal de formulario** con campos:
  - Nombre
  - Descripción
  - Precio
  - Stock
  - Categoría
  - URL de imagen

#### Gestión de Usuarios
- **Tabla de usuarios** con búsqueda
- **Acciones**:
  - Crear nuevo usuario
  - Editar usuario
  - Eliminar usuario
- **Modal de formulario** con campos:
  - Nombre
  - Apellido
  - Email
  - Rol (Cliente/Administrador)
- **Badges de rol**: Admin (rojo), Cliente (azul)

#### Gestión de Pedidos
- **Tabla de pedidos** con filtros
- **Filtros disponibles**:
  - Búsqueda por ID o cliente
  - Por estado (Todos, Pendiente, Procesando, Enviado, Entregado, Cancelado)
- **Acciones**:
  - Cambiar estado del pedido
  - Ver detalle
- **Modal para cambiar estado**:
  - Muestra cliente, total y estado actual
  - Selector de nuevo estado

## Estilos y Tema

### Variables de Color
```css
--clr-main: #11212d        /* Azul oscuro principal */
--clr-main-light: #9ba8ab  /* Gris azulado */
--clr-white: #ececec       /* Blanco/Gris claro */
--clr-gray: #e2e2e2        /* Gris */
--clr-red: #961818         /* Rojo de error */
--clr-danger: #961818      /* Rojo de peligro */
--clr-danger-dark: #7a1313 /* Rojo oscuro */
```

### Responsive
Las vistas se adaptan automáticamente en dispositivos móviles (max-width: 768px)

## Flujo de Autenticación

1. **Usuario se registra/inicia sesión** en `/login` o `/registro`
2. **Backend retorna token JWT** y datos del usuario
3. **Token se almacena** en localStorage
4. **Token se incluye** en todas las solicitudes HTTP
5. **Si token expira (401)**: Usuario es redirigido a `/login`
6. **Logout**: Limpia token y redirige a `/login`

## Integración con Servicios

Todas las vistas usan los servicios centralizados:

```jsx
import AuthService from '@/services/login/AuthService';
import ProductosService from '@/services/publico/ProductoService';
import PedidoService from '@/services/cliente/PedidoService';
import AdminProductoService from '@/services/admin/AdminProductoService';
```

Ver `API_SETUP.md` para más detalles sobre servicios.

## Ejemplo de Uso

### En un componente
```jsx
import React, { useState, useEffect } from 'react';
import PedidoService from '../../services/cliente/PedidoService';

const MiComponente = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      const data = await PedidoService.getAll();
      setPedidos(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? <p>Cargando...</p> : <p>{pedidos.length} pedidos</p>}
    </div>
  );
};
```

## Notas Importantes

1. **Autenticación**: Siempre verifica que el usuario esté autenticado antes de acceder a rutas protegidas
2. **Manejo de errores**: Todos los servicios lanzan excepciones con información útil
3. **Estados**: Usa el contexto de carrito (CarritoContext) para estado global del carrito
4. **Responsive**: Las vistas se adaptan a dispositivos móviles
5. **Accesibilidad**: Usa Bootstrap Icons para mejor UX
