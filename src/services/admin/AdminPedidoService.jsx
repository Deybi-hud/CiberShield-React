<<<<<<< HEAD
import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS } from '../../config/api';

class AdminPedidoService {
  /**
   * Obtener todos los pedidos
   * @param {Object} params - Parámetros de búsqueda (página, estado, usuario, etc.)
   * @returns {Promise} Lista de pedidos
   */
  async getAll(params = {}) {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN_PEDIDOS.GET_ALL, {
        params,
      });
      const data = response.data;
      if (Array.isArray(data)) {
        return data;
      } else if (data && typeof data === 'object' && Array.isArray(data.data)) {
        return data.data;
      } else if (data && typeof data === 'object' && Array.isArray(data.pedidos)) {
        return data.pedidos;
      } else {
        console.warn('Formato inesperado de respuesta API pedidos admin:', data);
        return [];
      }
    } catch (error) {
      console.error('Error al obtener pedidos:', error.message);
      return [];
    }
  }

  /**
   * Obtener pedido por ID
   * @param {string|number} id - ID del pedido
   * @returns {Promise} Datos del pedido
   */
  async getById(id) {
    try {
      const endpoint = API_ENDPOINTS.ADMIN_PEDIDOS.GET_BY_ID.replace(':id', id);
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener pedido ${id}:`, error);
      throw error;
    }
  }

  /**
   * Actualizar estado del pedido
   * @param {string|number} id - ID del pedido
   * @param {string} nuevoEstado - Nuevo estado (pendiente, procesando, enviado, entregado, cancelado)
   * @returns {Promise} Pedido actualizado
   */
  async updateStatus(id, nuevoEstado) {
    try {
      const endpoint = API_ENDPOINTS.ADMIN_PEDIDOS.UPDATE_STATUS.replace(':id', id);
      const response = await axiosInstance.put(endpoint, {
        estado: nuevoEstado,
      });
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar estado del pedido ${id}:`, error);
      throw error;
    }
  }
}

export default new AdminPedidoService();
=======
import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/admin/pedidos"
>>>>>>> parent of a176138 (Update)
