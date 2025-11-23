import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/cliente/pagos"

class PagoService {
<<<<<<< HEAD
  /**
   * Crear nuevo pago
   * @param {Object} datos - Datos del pago (monto, método, etc.)
   * @returns {Promise} Pago creado
   */
  async create(datos) {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.PAGOS.CREATE, datos);
      return response.data;
    } catch (error) {
      console.error('Error al crear pago:', error);
      throw error;
    }
  }

  /**
   * Obtener estado del pago
   * @param {string|number} id - ID del pago
   * @returns {Promise} Estado del pago
   */
  async getStatus(id) {
    try {
      const endpoint = API_ENDPOINTS.PAGOS.GET_STATUS.replace(':id', id);
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener estado del pago ${id}:`, error);
      throw error;
    }
  }

  /**
   * Verificar pago
   * @param {string|number} id - ID del pago
   * @returns {Promise} Resultado de la verificación
   */
  async verify(id) {
    try {
      const endpoint = API_ENDPOINTS.PAGOS.VERIFY.replace(':id', id);
      const response = await axiosInstance.post(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error al verificar pago ${id}:`, error);
      throw error;
    }
  }
=======

>>>>>>> parent of 6d23ee6 (feat: configuración completa frontend con backend - servicios, vistas cliente y admin)
}

export default new PagoService;