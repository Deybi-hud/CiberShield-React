// Configuración centralizada de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://snake-pc-api.onrender.com/api/v1';

export const API_ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/registrar',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  
  // Productos
  PRODUCTOS: {
    GET_ALL: '/productos',
    GET_BY_ID: '/productos/:id',
    CREATE: '/admin/productos',
    UPDATE: '/admin/productos/:id',
    DELETE: '/admin/productos/:id',
  },
  
  // Ubicaciones
  UBICACIONES: {
    GET_ALL: '/ubicaciones',
    GET_BY_ID: '/ubicaciones/:id',
  },
  
  // Pedidos (cliente)
  PEDIDOS: {
    GET_ALL: '/pedidos',
    GET_BY_ID: '/pedidos/:id',
    CREATE: '/pedidos',
    UPDATE: '/pedidos/:id',
    CANCEL: '/pedidos/:id/cancelar',
  },
  
  // Pagos
  PAGOS: {
    CREATE: '/pagos',
    VERIFY: '/pagos/:id/verificar',
    GET_STATUS: '/pagos/:id',
  },
  
  // Perfil Usuario
  PERFIL: {
    GET: '/usuarios/perfil',
    UPDATE: '/usuarios/perfil',
    CAMBIAR_PASSWORD: '/usuarios/perfil/password',
  },
  
  // Admin - Usuarios
  ADMIN_USUARIOS: {
    GET_ALL: '/admin/usuarios',
    GET_BY_ID: '/admin/usuarios/:id',
    CREATE: '/admin/usuarios',
    UPDATE: '/admin/usuarios/:id',
    DELETE: '/admin/usuarios/:id',
  },
  
  // Admin - Productos
  ADMIN_PRODUCTOS: {
    GET_ALL: '/admin/productos',
    GET_BY_ID: '/admin/productos/:id',
    CREATE: '/admin/productos',
    UPDATE: '/admin/productos/:id',
    DELETE: '/admin/productos/:id',
  },
  
  // Admin - Ubicaciones
  ADMIN_UBICACIONES: {
    GET_ALL: '/admin/ubicaciones',
    GET_BY_ID: '/admin/ubicaciones/:id',
    CREATE: '/admin/ubicaciones',
    UPDATE: '/admin/ubicaciones/:id',
    DELETE: '/admin/ubicaciones/:id',
  },
  
  // Admin - Pedidos
  ADMIN_PEDIDOS: {
    GET_ALL: '/admin/pedidos',
    GET_BY_ID: '/admin/pedidos/:id',
    UPDATE_STATUS: '/admin/pedidos/:id/estado',
  },
  
  // Admin - Roles
  ADMIN_ROLES: {
    GET_ALL: '/admin/roles',
    GET_BY_ID: '/admin/roles/:id',
    CREATE: '/admin/roles',
    UPDATE: '/admin/roles/:id',
    DELETE: '/admin/roles/:id',
  },
  
  // Admin - Dashboard
  ADMIN_DASHBOARD: {
    STATS: '/admin/dashboard/estadisticas',
    VENTAS: '/admin/dashboard/ventas',
    PRODUCTOS_POPULARES: '/admin/dashboard/productos-populares',
  },
};

export default API_BASE_URL;
