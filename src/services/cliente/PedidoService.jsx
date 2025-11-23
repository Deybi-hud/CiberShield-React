import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS } from '../../config/api';

class PedidoService {
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
      return response.data;
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      throw error;
    }
  }

  /**
   * Obtener pedido por ID
   * @param {string|number} id - ID del pedido
   * @returns {Promise} Datos del pedido
   */
  async getById(id) {
    try {
      const endpoint = API_ENDPOINTS.PEDIDOS.GET_BY_ID.replace(':id', id);
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener pedido ${id}:`, error);
      throw error;
    }
  }

  /**
   * Crear nuevo pedido
   * @param {Object} datos - Datos del pedido (productos, direccion, etc.)
   * @returns {Promise} Pedido creado
   */
  async create(datos) {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.PEDIDOS.CREATE, datos);
      return response.data;
    } catch (error) {
      console.error('Error al crear pedido:', error);
      throw error;
    }
  }

  /**
   * Actualizar pedido
   * @param {string|number} id - ID del pedido
   * @param {Object} datos - Datos actualizados
   * @returns {Promise} Pedido actualizado
   */
  async update(id, datos) {
    try {
      const endpoint = API_ENDPOINTS.PEDIDOS.UPDATE.replace(':id', id);
      const response = await axiosInstance.put(endpoint, datos);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar pedido ${id}:`, error);
      throw error;
    }
  }

  /**
   * Cancelar pedido
   * @param {string|number} id - ID del pedido
   * @returns {Promise}
   */
  async cancel(id) {
    try {
      const endpoint = API_ENDPOINTS.PEDIDOS.CANCEL.replace(':id', id);
      const response = await axiosInstance.post(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error al cancelar pedido ${id}:`, error);
      throw error;
    }
  }
}

export default new PedidoService();
