// src/services/api.js
import axios from 'axios';

const api = axios.create({
  // This line reads the variable from your .env file
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Named API functions
export const login = async (email, password) => {
  return api.post('/login', { email, password });
};

export const logout = async () => {
  // Implement logout logic if needed
  return Promise.resolve();
};

export const getStudents = async () => {
  return api.get('/students');
};

export const createStudent = async (student) => {
  return api.post('/students', student);
};

export const updateStudent = async (id, student) => {
  return api.put(`/students/${id}`, student);
};

export const deleteStudent = async (id) => {
  return api.delete(`/students/${id}`);
};

export default api;
