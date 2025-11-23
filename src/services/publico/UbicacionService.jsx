import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/ubicacion"

class UbicacionService {
<<<<<<< HEAD
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
=======
>>>>>>> parent of 6d23ee6 (feat: configuración completa frontend con backend - servicios, vistas cliente y admin)

}

export default new UbicacionService()