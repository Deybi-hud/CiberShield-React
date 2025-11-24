 
import { api } from '../api';

export const productoService = {
  getAll: () => api.get('/productos'),
  getById: (id) => api.get(`/productos/${id}`),
  getCategorias: () => api.get('/productos/categorias')
};
 
export const ubicacionService = {
  getRegiones: () => api.get('/ubicaciones'),
  getComunas: () => api.get('/ubicaciones/comunas'),
  getComunasPorRegion: (regionId) => api.get(`/ubicaciones/regiones/${regionId}/comunas`)
};