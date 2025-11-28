// src/api/axios.ts
import axios from "axios";

// Get backend URL from environment variable with fallback
// In production (Kubernetes), this will use relative path /api
// In development, it will use localhost:5141/api
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5141/api";

// Create axios instance with backend base URL
const API = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests if available
API.interceptors.request.use(
  (config) => {
    // Ensure headers exist
    config.headers = config.headers || {};
    
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log only in development
    if (import.meta.env.DEV) {
      console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    } else if (error.response?.status === 403) {
      // Forbidden
      console.error("Access forbidden");
    } else if (error.code === 'ECONNREFUSED') {
      console.error("Backend server is not running");
    } else if (error.code === 'NETWORK_ERROR') {
      console.error("Network error - check your connection");
    }
    
    return Promise.reject(error);
  }
);

export default API;