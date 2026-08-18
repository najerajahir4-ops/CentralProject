import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Interceptor para inyectar token CSRF en peticiones mutantes
API.interceptors.request.use((config) => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
    // Extraer valor de csrfToken de las cookies
    const match = document.cookie.match(new RegExp('(^| )csrfToken=([^;]+)'));
    if (match) {
      config.headers['X-CSRF-Token'] = match[2];
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
