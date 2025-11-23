<<<<<<< HEAD
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
      // Asegurar que siempre se retorna un array
      const data = response.data;
      if (Array.isArray(data)) {
        return data;
      } else if (data && typeof data === 'object' && Array.isArray(data.data)) {
        return data.data;
      } else if (data && typeof data === 'object' && Array.isArray(data.ubicaciones)) {
        return data.ubicaciones;
      } else {
        console.warn('Formato inesperado de respuesta API ubicaciones:', data);
        return [];
      }
    } catch (error) {
      console.error('Error al obtener ubicaciones:', error.message);
      return [];
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
=======
import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/ubicacion"
>>>>>>> parent of a176138 (Update)
