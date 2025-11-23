import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/cliente/pedidos"

class PedidoService {
<<<<<<< HEAD
  /**
   * Obtener todos los pedidos del usuario actual
   * @param {Object} params - Parámetros de búsqueda (página, estado, etc.)
   * @returns {Promise} Lista de pedidos
   */
  async getAll(params = {}) {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.PEDIDOS.GET_ALL, {
        params,
      });
      // Asegurar que siempre se retorna un array
      const data = response.data;
      if (Array.isArray(data)) {
        return data;
      } else if (data && typeof data === 'object' && Array.isArray(data.data)) {
        return data.data;
      } else if (data && typeof data === 'object' && Array.isArray(data.pedidos)) {
        return data.pedidos;
      } else {
        console.warn('Formato inesperado de respuesta API pedidos:', data);
        return [];
      }
    } catch (error) {
      console.error('Error al obtener pedidos:', error.message);
      return [];
    }
  }
=======
>>>>>>> parent of 6d23ee6 (feat: configuración completa frontend con backend - servicios, vistas cliente y admin)

}

export default new PedidoService()