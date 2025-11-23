<<<<<<< HEAD
import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS } from '../../config/api';

class DashboardService {
  /**
   * Obtener estadísticas generales del dashboard
   * @param {Object} params - Parámetros (período, rango de fechas, etc.)
   * @returns {Promise} Estadísticas (usuarios totales, pedidos, ingresos, etc.)
   */
  async getStats(params = {}) {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.ADMIN_DASHBOARD.STATS,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw error;
    }
  }

  /**
   * Obtener datos de ventas
   * @param {Object} params - Parámetros (período, rango de fechas, etc.)
   * @returns {Promise} Datos de ventas
   */
  async getVentas(params = {}) {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.ADMIN_DASHBOARD.VENTAS,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos de ventas:', error);
      throw error;
    }
  }

  /**
   * Obtener productos más populares
   * @param {Object} params - Parámetros (límite, período, etc.)
   * @returns {Promise} Lista de productos populares
   */
  async getProductosPopulares(params = {}) {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.ADMIN_DASHBOARD.PRODUCTOS_POPULARES,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos populares:', error);
      throw error;
    }
  }
}

export default new DashboardService();
=======
import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/admin/dashboard"
>>>>>>> parent of a176138 (Update)
