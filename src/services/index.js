// src/services/index.js
import axios from 'axios';

const API_BASE_URL = 'https://snake-pc-api.onrender.com/api/v1/';

// Configuración base de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== SERVICIOS PÚBLICOS ====================

// Productos
const ProductoService = {
  async getAll() {
    try {
      const response = await api.get('/productos');
      return response.data;
    } catch (error) {
      console.error('Error fetching productos:', error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching producto ${id}:`, error);
      throw error;
    }
  },

  async getCategorias() {
    try {
      const response = await api.get('/productos/categorias');
      return response.data;
    } catch (error) {
      console.error('Error fetching categorias:', error);
      throw error;
    }
  }
};

// Ubicaciones
const UbicacionService = {
  async getRegiones() {
    try {
      const response = await api.get('/ubicaciones');
      return response.data;
    } catch (error) {
      console.error('Error fetching regiones:', error);
      throw error;
    }
  },

  async getRegionById(id) {
    try {
      const response = await api.get(`/ubicaciones/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching region ${id}:`, error);
      throw error;
    }
  },

  async getComunasByRegion(regionId) {
    try {
      const response = await api.get(`/ubicaciones/regiones/${regionId}/comunas`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching comunas for region ${regionId}:`, error);
      throw error;
    }
  },

  async getAllComunas() {
    try {
      const response = await api.get('/ubicaciones/comunas');
      return response.data;
    } catch (error) {
      console.error('Error fetching comunas:', error);
      throw error;
    }
  }
};

// ==================== SERVICIOS DE AUTENTICACIÓN ====================

const AuthService = {
  async login(credentials) {
    try {
      const response = await api.post('/auths/login', credentials);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async register(userData, confirmarContrasena) {
    try {
      const response = await api.post('/auths/registrar', userData, {
        params: { confirmarContrasena }
      });
      return response;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAdmin() {
    const user = this.getCurrentUser();
    return user && (user.rol === 'ADMIN' || user.rol === 'MODERADOR');
  },

  logout() {
    localStorage.removeItem('user');
  }
};

const LoginService = {
  login: AuthService.login,
  register: AuthService.register,
  getCurrentUser: AuthService.getCurrentUser,
  logout: AuthService.logout,
  isAdmin: AuthService.isAdmin
};

// ==================== SERVICIOS PARA CLIENTE ====================

// Pedidos
const PedidoService = {
  async crearPedido(pedidoData) {
    try {
      const response = await api.post('/cliente/pedidos', pedidoData);
      return response.data;
    } catch (error) {
      console.error('Error creating pedido:', error);
      throw error;
    }
  },

  async getMisPedidos() {
    try {
      const response = await api.get('/cliente/pedidos');
      return response.data;
    } catch (error) {
      console.error('Error fetching pedidos:', error);
      throw error;
    }
  },

  async getPedidoById(id) {
    try {
      const response = await api.get(`/cliente/pedidos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching pedido ${id}:`, error);
      throw error;
    }
  },

  async cancelarPedido(id) {
    try {
      const response = await api.put(`/cliente/pedidos/${id}/cancelar`);
      return response.data;
    } catch (error) {
      console.error(`Error canceling pedido ${id}:`, error);
      throw error;
    }
  },

  async calcularTotal(id) {
    try {
      const response = await api.get(`/cliente/pedidos/${id}/total`);
      return response.data;
    } catch (error) {
      console.error(`Error calculating total for pedido ${id}:`, error);
      throw error;
    }
  },

  async pagarPedido(pedidoId, metodoPagoId) {
    try {
      const response = await api.post(`/cliente/pedidos/${pedidoId}/pagar`, null, {
        params: { metodoPagoId }
      });
      return response.data;
    } catch (error) {
      console.error(`Error paying pedido ${pedidoId}:`, error);
      throw error;
    }
  },

  async getMetodosEnvio() {
    try {
      const response = await api.get('/cliente/pedidos/metodo-envio/activos');
      return response.data;
    } catch (error) {
      console.error('Error fetching metodos envio:', error);
      throw error;
    }
  }
};

// Pagos
const PagoService = {
  async getMisPagos() {
    try {
      const response = await api.get('/cliente/pagos');
      return response.data;
    } catch (error) {
      console.error('Error fetching pagos:', error);
      throw error;
    }
  },

  async getMetodosPago() {
    try {
      const response = await api.get('/cliente/pagos/metodos-disponibles');
      return response.data;
    } catch (error) {
      console.error('Error fetching metodos pago:', error);
      throw error;
    }
  }
};

// Perfil
const PerfilService = {
  async getMiPerfil() {
    try {
      const response = await api.get('/perfiles/perfil');
      return response.data;
    } catch (error) {
      console.error('Error fetching perfil:', error);
      throw error;
    }
  },

  async actualizarPerfil(datos) {
    try {
      const response = await api.put('/perfiles/perfil', datos);
      return response.data;
    } catch (error) {
      console.error('Error updating perfil:', error);
      throw error;
    }
  },

  async cambiarContrasena(nuevaContrasena, confirmarContrasena) {
    try {
      const response = await api.put('/perfiles/cambiar-contrasena', null, {
        params: { nuevaContrasena, confirmarContrasena }
      });
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },

  async subirFoto(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.put('/usuario/subir-foto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    }
  },

  async desactivarCuenta() {
    try {
      const response = await api.put('/perfiles/desactivar-cuenta');
      return response.data;
    } catch (error) {
      console.error('Error deactivating account:', error);
      throw error;
    }
  },

  async reactivarCuenta() {
    try {
      const response = await api.put('/perfiles/reactivar-cuenta');
      return response.data;
    } catch (error) {
      console.error('Error reactivating account:', error);
      throw error;
    }
  }
};

// Carrito
const CarritoService = {
  async guardarCarritoBackend(carritoData) {
    try {
      const response = await api.post('/carrito', carritoData);
      return response.data;
    } catch (error) {
      console.error('Error saving carrito:', error);
      throw error;
    }
  },

  async getCarritoFromBackend() {
    try {
      const response = await api.get('/carrito');
      return response.data;
    } catch (error) {
      console.error('Error fetching carrito:', error);
      throw error;
    }
  }
};

// ==================== SERVICIOS PARA ADMINISTRADOR ====================

// Pedidos Admin
const AdminPedidoService = {
  async getAllPedidos() {
    try {
      const response = await api.get('/admin/pedidos');
      return response.data;
    } catch (error) {
      console.error('Error fetching pedidos:', error);
      throw error;
    }
  },

  async actualizarEstado(pedidoId, estado) {
    try {
      const response = await api.put(`/admin/pedidos/${pedidoId}/estado`, null, {
        params: { estado }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating estado for pedido ${pedidoId}:`, error);
      throw error;
    }
  },

  async crearMetodoEnvio(metodoEnvio) {
    try {
      const response = await api.post('/admin/pedidos/metodo-envio', metodoEnvio);
      return response.data;
    } catch (error) {
      console.error('Error creating metodo envio:', error);
      throw error;
    }
  }
};

// Productos Admin
const AdminProductoService = {
  async crearProducto(productoData) {
    try {
      const response = await api.post('/admin/productos', productoData);
      return response.data;
    } catch (error) {
      console.error('Error creating producto:', error);
      throw error;
    }
  },

  async actualizarParcial(id, datos) {
    try {
      const response = await api.patch(`/admin/productos/${id}`, datos);
      return response.data;
    } catch (error) {
      console.error(`Error updating producto ${id}:`, error);
      throw error;
    }
  },

  async eliminarProducto(id) {
    try {
      const response = await api.delete(`/admin/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting producto ${id}:`, error);
      throw error;
    }
  },

  async crearMarca(marca) {
    try {
      const response = await api.post('/admin/productos/marcas', marca);
      return response.data;
    } catch (error) {
      console.error('Error creating marca:', error);
      throw error;
    }
  },

  async actualizarMarca(id, marca) {
    try {
      const response = await api.put(`/admin/productos/marcas/${id}`, marca);
      return response.data;
    } catch (error) {
      console.error(`Error updating marca ${id}:`, error);
      throw error;
    }
  },

  async eliminarMarca(id) {
    try {
      const response = await api.delete(`/admin/productos/marcas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting marca ${id}:`, error);
      throw error;
    }
  },

  async crearCategoria(categoria) {
    try {
      const response = await api.post('/admin/productos/categorias', categoria);
      return response.data;
    } catch (error) {
      console.error('Error creating categoria:', error);
      throw error;
    }
  },

  async actualizarCategoria(id, categoria) {
    try {
      const response = await api.put(`/admin/productos/categorias/${id}`, categoria);
      return response.data;
    } catch (error) {
      console.error(`Error updating categoria ${id}:`, error);
      throw error;
    }
  },

  async eliminarCategoria(id) {
    try {
      const response = await api.delete(`/admin/productos/categorias/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting categoria ${id}:`, error);
      throw error;
    }
  }
};

// Usuarios Admin
const AdminUsuarioService = {
  async getAllContactos() {
    try {
      const response = await api.get('/admin/usuarios/contactos');
      return response.data;
    } catch (error) {
      console.error('Error fetching contactos:', error);
      throw error;
    }
  },

  async buscarUsuarioPorCorreo(correo) {
    try {
      const response = await api.get('/admin/usuarios/buscar', {
        params: { correo }
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching user by email ${correo}:`, error);
      throw error;
    }
  },

  async desactivarCuenta(usuarioId) {
    try {
      const response = await api.put(`/admin/usuarios/${usuarioId}/desactivar`);
      return response.data;
    } catch (error) {
      console.error(`Error deactivating user ${usuarioId}:`, error);
      throw error;
    }
  },

  async reactivarCuenta(usuarioId) {
    try {
      const response = await api.put(`/admin/usuarios/${usuarioId}/reactivar`);
      return response.data;
    } catch (error) {
      console.error(`Error reactivating user ${usuarioId}:`, error);
      throw error;
    }
  },

  async eliminarUsuario(usuarioId) {
    try {
      const response = await api.delete(`/admin/usuarios/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user ${usuarioId}:`, error);
      throw error;
    }
  }
};

// Roles Admin
const AdminRolService = {
  async crearRol(rol) {
    try {
      const response = await api.post('/admin/roles', rol);
      return response.data;
    } catch (error) {
      console.error('Error creating rol:', error);
      throw error;
    }
  },

  async getAllRoles() {
    try {
      const response = await api.get('/admin/roles');
      return response.data;
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  },

  async getRolById(id) {
    try {
      const response = await api.get(`/admin/roles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching rol ${id}:`, error);
      throw error;
    }
  },

  async verificarRolExiste(nombreRol) {
    try {
      const response = await api.get('/admin/roles/verificar', {
        params: { nombreRol }
      });
      return response.data;
    } catch (error) {
      console.error(`Error verifying rol ${nombreRol}:`, error);
      throw error;
    }
  }
};

// Ubicaciones Admin
const AdminUbicacionService = {
  async crearRegion(region) {
    try {
      const response = await api.post('/admin/ubicaciones', region);
      return response.data;
    } catch (error) {
      console.error('Error creating region:', error);
      throw error;
    }
  },

  async crearComuna(nombreComuna, regionId) {
    try {
      const response = await api.post('/admin/ubicaciones/comunas', null, {
        params: { nombreComuna, regionId }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating comuna:', error);
      throw error;
    }
  },

  async eliminarComuna(comunaId) {
    try {
      const response = await api.delete(`/admin/ubicaciones/comunas/${comunaId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting comuna ${comunaId}:`, error);
      throw error;
    }
  }
};

// Dashboard Admin
const DashboardService = {
  async getPedidosDelDia() {
    try {
      const response = await api.get('/admin/dashboards/reportes/dia');
      return response.data;
    } catch (error) {
      console.error('Error fetching pedidos del dia:', error);
      throw error;
    }
  },

  async getPedidosDelMes() {
    try {
      const response = await api.get('/admin/dashboards/reportes/mes');
      return response.data;
    } catch (error) {
      console.error('Error fetching pedidos del mes:', error);
      throw error;
    }
  },

  async getEstadisticasDelDia() {
    try {
      const response = await api.get('/admin/dashboards/reportes/estadisticas-dia');
      return response.data;
    } catch (error) {
      console.error('Error fetching estadisticas del dia:', error);
      throw error;
    }
  },

  async getEstadisticasDelMes() {
    try {
      const response = await api.get('/admin/dashboards/reportes/estadisticas-mes');
      return response.data;
    } catch (error) {
      console.error('Error fetching estadisticas del mes:', error);
      throw error;
    }
  },

  async getPedidosPorRango(inicio, fin) {
    try {
      const response = await api.get('/admin/dashboards/reportes/rango', {
        params: { inicio, fin }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching pedidos por rango:', error);
      throw error;
    }
  }
};

// Exportar todos los servicios
export {
  // Públicos
  ProductoService,
  UbicacionService,
  
  // Autenticación
  AuthService,
  LoginService,
  
  // Cliente
  PedidoService,
  PagoService,
  PerfilService,
  CarritoService,
  
  // Admin
  AdminPedidoService,
  AdminProductoService,
  AdminUsuarioService,
  AdminRolService,
  AdminUbicacionService,
  DashboardService,
  
  // Configuración
  api,
  API_BASE_URL
};