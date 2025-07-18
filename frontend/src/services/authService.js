// src/services/authService.js
import api from './api';

export const login = async (credentials) => {
  // Your backend's login route is /login, not /auth/login
  const response = await api.post('/login', credentials);
  
  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
