import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS } from '../../config/api';

class AuthService {
  /**
   * Iniciar sesión
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise} Respuesta del servidor con token y datos de usuario
   */
  async login(email, password) {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });

      // Guardar token y datos de usuario en localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      }

      return response.data;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  /**
   * Registrar nuevo usuario
   * @param {Object} datos - Datos del usuario (nombre, email, password, etc.)
   * @returns {Promise} Respuesta del servidor
   */
  async registrar(datos) {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, datos);

      // Guardar token si viene en la respuesta
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      }

      return response.data;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }

  /**
   * Cerrar sesión
   * @returns {Promise}
   */
  async logout() {
    try {
      await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      return true;
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Limpiar localStorage incluso si hay error
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      throw error;
    }
  }

  /**
   * Refrescar token
   * @returns {Promise} Nuevo token
   */
  async refreshToken() {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (error) {
      console.error('Error al refrescar token:', error);
      throw error;
    }
  }

  /**
   * Obtener usuario actual del localStorage
   * @returns {Object|null} Datos del usuario o null
   */
  getUsuarioActual() {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  /**
   * Verificar si el usuario está autenticado
   * @returns {boolean}
   */
  isAutenticado() {
    return !!localStorage.getItem('token');
  }

  /**
   * Obtener token actual
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('token');
  }
}

export default new AuthService();
