import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS } from '../../config/api';

class ProductosService {
  /**
   * Obtener todos los productos
   * @param {Object} params - Parámetros de búsqueda (página, límite, categoría, etc.)
   * @returns {Promise} Lista de productos
   */
  async getAll(params = {}) {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTOS.GET_ALL, {
        params,
      });
      // Asegurar que siempre se retorna un array
      const data = response.data;
      if (Array.isArray(data)) {
        return data;
      } else if (data && typeof data === 'object' && Array.isArray(data.data)) {
        return data.data;
      } else if (data && typeof data === 'object' && Array.isArray(data.productos)) {
        return data.productos;
      } else {
        console.warn('Formato inesperado de respuesta API:', data);
        return [];
      }
    } catch (error) {
      console.error('Error al obtener productos:', error.message);
      // Retornar array vacío en lugar de lanzar error para evitar loops
      if (error.response?.status === 401) {
        console.warn('API retornó 401 para ruta pública de productos. Retornando array vacío.');
        return [];
      }
      // Para otros errores, también retornar array vacío para evitar crashes
      console.error('Detalle del error:', error);
      return [];
    }
  }

  /**
   * Obtener producto por ID
   * @param {string|number} id - ID del producto
   * @returns {Promise} Datos del producto
   */
  async getById(id) {
    try {
      const endpoint = API_ENDPOINTS.PRODUCTOS.GET_BY_ID.replace(':id', id);
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener producto con ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Crear nuevo producto (solo admin)
   * @param {Object} datos - Datos del producto
   * @returns {Promise} Producto creado
   */
  async create(datos) {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.PRODUCTOS.CREATE, datos);
      return response.data;
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  }

  /**
   * Actualizar producto (solo admin)
   * @param {string|number} id - ID del producto
   * @param {Object} datos - Datos actualizados
   * @returns {Promise} Producto actualizado
   */
  async update(id, datos) {
    try {
      const endpoint = API_ENDPOINTS.PRODUCTOS.UPDATE.replace(':id', id);
      const response = await axiosInstance.put(endpoint, datos);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar producto ${id}:`, error);
      throw error;
    }
  }

  /**
   * Eliminar producto (solo admin)
   * @param {string|number} id - ID del producto
   * @returns {Promise}
   */
  async delete(id) {
    try {
      const endpoint = API_ENDPOINTS.PRODUCTOS.DELETE.replace(':id', id);
      const response = await axiosInstance.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar producto ${id}:`, error);
      throw error;
    }
  }
}

export default new ProductosService();
