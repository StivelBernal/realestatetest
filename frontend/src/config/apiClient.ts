import axios from 'axios';
import config from '@/config';

// Configuración por defecto de Axios
const apiClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000, // 10 segundos de timeout
});

// Interceptor para requests - agregar logs en desarrollo. Se podria agregar aqui la autenticación si es necesario.
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses - manejar errores globalmente
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.data) {
      console.error('Error Data:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default apiClient;