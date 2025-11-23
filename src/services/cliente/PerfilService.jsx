import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/"

class PerfilService {
<<<<<<< HEAD
  /**
   * Obtener perfil del usuario actual
   * @returns {Promise} Datos del perfil del usuario
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
   * Actualizar perfil del usuario
   * @param {Object} datos - Datos a actualizar (nombre, apellido, email, etc.)
   * @returns {Promise} Perfil actualizado
   */
  async update(datos) {
    try {
      const response = await axiosInstance.put(API_ENDPOINTS.PERFIL.UPDATE, datos);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }
  }

  /**
   * Cambiar contraseña del usuario
   * @param {Object} datos - Contraseña actual y nueva (passwordActual, passwordNueva)
   * @returns {Promise}
   */
  async cambiarPassword(datos) {
    try {
      const response = await axiosInstance.put(API_ENDPOINTS.PERFIL.CAMBIAR_PASSWORD, datos);
      return response.data;
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      throw error;
    }
  }
=======

>>>>>>> parent of 6d23ee6 (feat: configuración completa frontend con backend - servicios, vistas cliente y admin)
}

export default new PerfilService()