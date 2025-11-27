import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5141/api';

console.log('🔗 API Base URL:', API_BASE_URL); // Should show port 5411

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('🚀 Making API request to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ API response received:', response.status);
    return response;
  },
  (error) => {
    console.error('❌ API Error Details:', {
      message: error.message,
      code: error.code,
      url: error.config?.baseURL + error.config?.url,
      status: error.response?.status,
    });
    
    if (error.code === 'ECONNREFUSED' || error.message === 'Network Error') {
      console.error('💥 Cannot connect to backend on port 5411!');
    }
    
    return Promise.reject(error);
  }
);

export default api;