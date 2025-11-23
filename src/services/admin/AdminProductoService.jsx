import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/admin/productos"

class AdminProductoService {
<<<<<<< HEAD
  /**
   * Obtener todos los productos (vista admin)
   * @param {Object} params - Parámetros de búsqueda (página, categoría, estado, etc.)
   * @returns {Promise} Lista de productos
   */
  async getAll(params = {}) {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN_PRODUCTOS.GET_ALL, {
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
        console.warn('Formato inesperado de respuesta API productos admin:', data);
        return [];
      }
    } catch (error) {
      console.error('Error al obtener productos (admin):', error.message);
      return [];
    }
  }
=======
>>>>>>> parent of 6d23ee6 (feat: configuración completa frontend con backend - servicios, vistas cliente y admin)

}

export default new AdminProductoService()