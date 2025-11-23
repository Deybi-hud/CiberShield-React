<<<<<<< HEAD
import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS } from '../../config/api';

class AdminProductoService {
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

  /**
   * Obtener producto por ID
   * @param {string|number} id - ID del producto
   * @returns {Promise} Datos del producto
   */
  async getById(id) {
    try {
      const endpoint = API_ENDPOINTS.ADMIN_PRODUCTOS.GET_BY_ID.replace(':id', id);
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener producto ${id}:`, error);
      throw error;
    }
  }

  /**
   * Crear nuevo producto
   * @param {Object} datos - Datos del producto
   * @returns {Promise} Producto creado
   */
  async create(datos) {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.ADMIN_PRODUCTOS.CREATE, datos);
      return response.data;
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  }

  /**
   * Actualizar producto
   * @param {string|number} id - ID del producto
   * @param {Object} datos - Datos actualizados
   * @returns {Promise} Producto actualizado
   */
  async update(id, datos) {
    try {
      const endpoint = API_ENDPOINTS.ADMIN_PRODUCTOS.UPDATE.replace(':id', id);
      const response = await axiosInstance.put(endpoint, datos);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar producto ${id}:`, error);
      throw error;
    }
  }

  /**
   * Eliminar producto
   * @param {string|number} id - ID del producto
   * @returns {Promise}
   */
  async delete(id) {
    try {
      const endpoint = API_ENDPOINTS.ADMIN_PRODUCTOS.DELETE.replace(':id', id);
      const response = await axiosInstance.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar producto ${id}:`, error);
      throw error;
    }
  }
}

export default new AdminProductoService();
=======
import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/admin/productos"
>>>>>>> parent of a176138 (Update)
