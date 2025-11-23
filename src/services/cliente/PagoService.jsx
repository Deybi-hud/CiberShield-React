import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS } from '../../config/api';

class PagoService {
  /**
   * Crear un nuevo pago
   * @param {Object} datos - Datos del pago (monto, método, pedidoId, etc.)
   * @returns {Promise} Pago creado con detalles de procesamiento
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
   * Verificar/Confirmar un pago
   * @param {string|number} id - ID del pago
   * @param {Object} datos - Datos adicionales de verificación si es necesario
   * @returns {Promise} Estado del pago verificado
   */
  async verify(id, datos = {}) {
    try {
      const endpoint = API_ENDPOINTS.PAGOS.VERIFY.replace(':id', id);
      const response = await axiosInstance.post(endpoint, datos);
      return response.data;
    } catch (error) {
      console.error(`Error al verificar pago ${id}:`, error);
      throw error;
    }
  }

  /**
   * Obtener estado del pago
   * @param {string|number} id - ID del pago
   * @returns {Promise} Estado actual del pago
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
}

export default new PagoService();
