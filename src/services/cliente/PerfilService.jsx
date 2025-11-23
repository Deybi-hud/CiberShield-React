import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS } from '../../config/api';

class PerfilService {
  /**
   * Obtener datos del perfil del usuario actual
   * @returns {Promise} Datos del perfil
   */
  async get() {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.PERFIL.GET);
      return response.data;
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      throw error;
    }
  }

  /**
   * Actualizar datos del perfil
   * @param {Object} datos - Datos a actualizar (nombre, email, teléfono, etc.)
   * @returns {Promise} Perfil actualizado
   */
  async update(datos) {
    try {
      const response = await axiosInstance.put(API_ENDPOINTS.PERFIL.UPDATE, datos);

      // Actualizar datos en localStorage
      if (response.data.usuario) {
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      }

      return response.data;
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }
  }

  /**
   * Cambiar contraseña del usuario
   * @param {string} passwordActual - Contraseña actual
   * @param {string} passwordNueva - Nueva contraseña
   * @returns {Promise}
   */
  async cambiarPassword(passwordActual, passwordNueva) {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.PERFIL.CAMBIAR_PASSWORD, {
        passwordActual,
        passwordNueva,
      });
      return response.data;
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      throw error;
    }
  }
}

export default new PerfilService();
