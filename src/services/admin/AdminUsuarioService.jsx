import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS } from '../../config/api';

class AdminUsuarioService {
  /**
   * Obtener todos los usuarios
   * @param {Object} params - Parámetros de búsqueda (página, rol, estado, etc.)
   * @returns {Promise} Lista de usuarios
   */
  async getAll(params = {}) {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN_USUARIOS.GET_ALL, {
        params,
      });
      const data = response.data;
      if (Array.isArray(data)) {
        return data;
      } else if (data && typeof data === 'object' && Array.isArray(data.data)) {
        return data.data;
      } else if (data && typeof data === 'object' && Array.isArray(data.usuarios)) {
        return data.usuarios;
      } else {
        console.warn('Formato inesperado de respuesta API usuarios:', data);
        return [];
      }
    } catch (error) {
      console.error('Error al obtener usuarios:', error.message);
      return [];
    }
  }

  /**
   * Obtener usuario por ID
   * @param {string|number} id - ID del usuario
   * @returns {Promise} Datos del usuario
   */
  async getById(id) {
    try {
      const endpoint = API_ENDPOINTS.ADMIN_USUARIOS.GET_BY_ID.replace(':id', id);
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener usuario ${id}:`, error);
      throw error;
    }
  }

  /**
   * Crear nuevo usuario
   * @param {Object} datos - Datos del usuario (nombre, email, password, rol, etc.)
   * @returns {Promise} Usuario creado
   */
  async create(datos) {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.ADMIN_USUARIOS.CREATE, datos);
      return response.data;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  /**
   * Actualizar usuario
   * @param {string|number} id - ID del usuario
   * @param {Object} datos - Datos actualizados
   * @returns {Promise} Usuario actualizado
   */
  async update(id, datos) {
    try {
      const endpoint = API_ENDPOINTS.ADMIN_USUARIOS.UPDATE.replace(':id', id);
      const response = await axiosInstance.put(endpoint, datos);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar usuario ${id}:`, error);
      throw error;
    }
  }

  /**
   * Eliminar usuario
   * @param {string|number} id - ID del usuario
   * @returns {Promise}
   */
  async delete(id) {
    try {
      const endpoint = API_ENDPOINTS.ADMIN_USUARIOS.DELETE.replace(':id', id);
      const response = await axiosInstance.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar usuario ${id}:`, error);
      throw error;
    }
  }
}

export default new AdminUsuarioService();
