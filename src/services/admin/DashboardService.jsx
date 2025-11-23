import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS } from '../../config/api';

class DashboardService {
  /**
   * Obtener estadísticas del dashboard
   * @returns {Promise} Datos de estadísticas generales
   */
  async getStats() {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN_DASHBOARD.STATS);
      return response.data;
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw error;
    }
  }

  /**
   * Obtener datos de ventas
   * @param {Object} params - Parámetros de filtro (período, etc.)
   * @returns {Promise} Datos de ventas
   */
  async getVentas(params = {}) {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN_DASHBOARD.VENTAS, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener ventas:', error);
      throw error;
    }
  }

  /**
   * Obtener productos populares
   * @param {Object} params - Parámetros de filtro (período, etc.)
   * @returns {Promise} Datos de productos populares
   */
  async getProductosPopulares(params = {}) {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN_DASHBOARD.PRODUCTOS_POPULARES, {
        params,
      });
      const data = response.data;
      if (Array.isArray(data)) {
        return data;
      } else if (data && typeof data === 'object' && Array.isArray(data.data)) {
        return data.data;
      } else if (data && typeof data === 'object' && Array.isArray(data.productos)) {
        return data.productos;
      } else {
        console.warn('Formato inesperado de respuesta API productos populares:', data);
        return [];
      }
    } catch (error) {
      console.error('Error al obtener productos populares:', error.message);
      return [];
    }
  }
}

export default new DashboardService();
