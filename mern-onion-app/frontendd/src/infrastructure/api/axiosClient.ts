import axios from 'axios';

const API_BASE = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api';

export const api = axios.create({ baseURL: API_BASE, headers: { 'Content-Type': 'application/json' } });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use((r) => r, (e) => Promise.reject(e));

export default api;
