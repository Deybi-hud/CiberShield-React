import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS } from '../../config/api';

class UbicacionService {
  /**
   * Obtener todas las ubicaciones (ciudades/países)
   * @param {Object} params - Parámetros de búsqueda
   * @returns {Promise} Lista de ubicaciones
   */
  async getAll(params = {}) {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.UBICACIONES.GET_ALL, {
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
      const endpoint = API_ENDPOINTS.UBICACIONES.GET_BY_ID.replace(':id', id);
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener ubicación ${id}:`, error);
      throw error;
    }
  }
}

export default new UbicacionService();
