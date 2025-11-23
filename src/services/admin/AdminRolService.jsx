import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/admin/roles"

class AdminRolService {
<<<<<<< HEAD
  /**
   * Obtener todos los roles
   * @param {Object} params - Parámetros de búsqueda
   * @returns {Promise} Lista de roles
   */
  async getAll(params = {}) {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN_ROLES.GET_ALL, {
        params,
      });
      const data = response.data;
      if (Array.isArray(data)) {
        return data;
      } else if (data && typeof data === 'object' && Array.isArray(data.data)) {
        return data.data;
      } else if (data && typeof data === 'object' && Array.isArray(data.roles)) {
        return data.roles;
      } else {
        console.warn('Formato inesperado de respuesta API roles:', data);
        return [];
      }
    } catch (error) {
      console.error('Error al obtener roles:', error.message);
      return [];
    }
  }

  /**
   * Obtener rol por ID
   * @param {string|number} id - ID del rol
   * @returns {Promise} Datos del rol
   */
  async getById(id) {
    try {
      const endpoint = API_ENDPOINTS.ADMIN_ROLES.GET_BY_ID.replace(':id', id);
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener rol ${id}:`, error);
      throw error;
    }
  }

  /**
   * Crear nuevo rol
   * @param {Object} datos - Datos del rol (nombre, descripción, permisos, etc.)
   * @returns {Promise} Rol creado
   */
  async create(datos) {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.ADMIN_ROLES.CREATE, datos);
      return response.data;
    } catch (error) {
      console.error('Error al crear rol:', error);
      throw error;
    }
  }

  /**
   * Actualizar rol
   * @param {string|number} id - ID del rol
   * @param {Object} datos - Datos actualizados
   * @returns {Promise} Rol actualizado
   */
  async update(id, datos) {
    try {
      const endpoint = API_ENDPOINTS.ADMIN_ROLES.UPDATE.replace(':id', id);
      const response = await axiosInstance.put(endpoint, datos);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar rol ${id}:`, error);
      throw error;
    }
  }

  /**
   * Eliminar rol
   * @param {string|number} id - ID del rol
   * @returns {Promise}
   */
  async delete(id) {
    try {
      const endpoint = API_ENDPOINTS.ADMIN_ROLES.DELETE.replace(':id', id);
      const response = await axiosInstance.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar rol ${id}:`, error);
      throw error;
    }
  }
=======

>>>>>>> parent of 6d23ee6 (feat: configuración completa frontend con backend - servicios, vistas cliente y admin)
}

export default new AdminRolService()