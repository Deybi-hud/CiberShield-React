 
import { api } from '../api';

export default {
  getAll: () => api.get('/productos'),
  getById: (id) => api.get(`/productos/${id}`),
  getCategorias: () => api.get('/productos/categorias')
};