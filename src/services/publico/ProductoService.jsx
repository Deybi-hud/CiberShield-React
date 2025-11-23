import axios from "axios";

const API_URL = 'https://snake-pc-api.onrender.com/api/v1/productos';


class ProductosService {
<<<<<<< HEAD
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
=======
>>>>>>> parent of 6d23ee6 (feat: configuración completa frontend con backend - servicios, vistas cliente y admin)

    async getAll() {
        try {
            const response = await axios.get(`${API_URL}/productos`);
        } catch (error) {
            console.error("ERROR --> al obtener un producto: ", error);
            throw error;
        }
    }

    async getById(id) {
        try {

        } catch (error) {
            console.error("Error --> al obtener un producto", error)
            throw error;
        }
    }
}


export default new ProductosService();