// src/api/axios.ts
import axios from "axios";

// Get backend URL from environment variable with fallback
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5141/api";

// Create axios instance with backend base URL
const API = axios.create({
  baseURL: apiBaseUrl,
});

// Request interceptor for logging (optional)
API.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
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
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default API;