import axios from 'axios';
import { default as API_BASE_URL } from './api';

// Crear instancia de axios
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Flag para evitar múltiples redirecciones simultáneas
let isRedirecting = false;

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
    console.error('Error en la solicitud:', error.message);
    
    // Si recibimos 401, el token no es válido (solo en rutas protegidas)
    if (error.response?.status === 401) {
      // Verificar si el endpoint requería autenticación
      const requiresAuth = error.config?.headers?.Authorization;
      
      if (requiresAuth && !isRedirecting && window.location.pathname !== '/login') {
        isRedirecting = true;
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        
        // Evitar redirecciones infinitas
        setTimeout(() => {
          window.location.href = '/login';
          isRedirecting = false;
        }, 500);
      } else if (!requiresAuth) {
        // Para rutas públicas que devuelven 401, no redirigir
        console.warn('API retornó 401 en una solicitud pública');
      }
    }
    
    // Log de errores de red
    if (!error.response) {
      console.error('Error de red - posiblemente CORS o conexión fallida');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
