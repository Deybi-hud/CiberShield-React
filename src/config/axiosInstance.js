import axios from 'axios';

const axiosInstance = axios.create();

// Interceptor para agregar el token y ID a todas las peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    // Agregar token en header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Agregar ID del usuario en header (alternativa al body)
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.id) {
          config.headers['X-User-ID'] = userData.id;
        }
      } catch (error) {
        console.error('Error parseando user:', error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejo de errores
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el token expiró, limpiar localStorage
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
