import axios from 'axios';
import API_BASE_URL from './api';

// Crear instancia de axios
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor de solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    // Agregar token de autenticación si existe
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si recibimos 401, el token no es válido
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      // Redirigir a login si es necesario
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
