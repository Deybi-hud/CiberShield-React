import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS } from '../../config/api';

class AdminUbicacionService {
  /**
   * Obtener todas las ubicaciones
   * @param {Object} params - Parámetros de búsqueda
   * @returns {Promise} Lista de ubicaciones
   */
  async getAll(params = {}) {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN_UBICACIONES.GET_ALL, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener ubicaciones:', error);
      throw error;
    }
  }

  /**
   * Obtener ubicación por ID
   * @param {string|number} id - ID de la ubicación
   * @returns {Promise} Datos de la ubicación
   */
  async getById(id) {
    try {
      const endpoint = API_ENDPOINTS.ADMIN_UBICACIONES.GET_BY_ID.replace(':id', id);
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener ubicación ${id}:`, error);
      throw error;
    }
  }

  /**
   * Crear ubicación
   * @param {Object} datos - Datos de la ubicación
   * @returns {Promise} Ubicación creada
   */
  async create(datos) {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.ADMIN_UBICACIONES.CREATE, datos);
      return response.data;
    } catch (error) {
      console.error('Error al crear ubicación:', error);
      throw error;
    }
  }

  /**
   * Actualizar ubicación
   * @param {string|number} id - ID de la ubicación
   * @param {Object} datos - Datos actualizados
   * @returns {Promise} Ubicación actualizada
   */
  async update(id, datos) {
    try {
      const endpoint = API_ENDPOINTS.ADMIN_UBICACIONES.UPDATE.replace(':id', id);
      const response = await axiosInstance.put(endpoint, datos);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar ubicación ${id}:`, error);
      throw error;
    }
  }

  /**
   * Eliminar ubicación
   * @param {string|number} id - ID de la ubicación
   * @returns {Promise}
   */
  async delete(id) {
    try {
      const endpoint = API_ENDPOINTS.ADMIN_UBICACIONES.DELETE.replace(':id', id);
      const response = await axiosInstance.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar ubicación ${id}:`, error);
      throw error;
    }
  }
}

export default new AdminUbicacionService();
