 
import { api } from '../api';
import { useAuth } from '../../context/AuthContext';

const checkAdmin = () => {
  const { isAdmin } = useAuth();
  if (!isAdmin()) throw new Error('Acceso denegado: solo administradores');
};

export const pedidoAdminService = {
  getAll: async () => {
    checkAdmin();
    return api.get('/admin/pedidos');
  },
  actualizarEstado: (pedidoId, estado) => {
    checkAdmin();
    return api.put(`/admin/pedidos/${pedidoId}/estado?estado=${estado}`);
  }
};

 
export const productoAdminService = {
  crear: (payload) => {
    checkAdmin();
    return api.post('/admin/productos', payload);
  },
  actualizarParcial: (id, datos) => {
    checkAdmin();
    return api.put(`/admin/productos/${id}`, datos);
  },
  eliminar: (id) => {
    checkAdmin();
    return api.delete(`/admin/productos/${id}`);
  }
};

 
export const usuarioAdminService = {
  desactivar: (usuarioId) => {
    checkAdmin();
    return api.put(`/admin/usuarios/${usuarioId}/desactivar`);
  },
  reactivar: (usuarioId) => {
    checkAdmin();
    return api.put(`/admin/usuarios/${usuarioId}/reactivar`);
  },
  eliminar: (usuarioId) => {
    checkAdmin();
    return api.delete(`/admin/usuarios/${usuarioId}`);
  }
};