// src/services/api.js
import axios from 'axios';

// Create an Axios instance with the base URL from environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Interceptor to add the JWT token to every request if it exists
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

// Authentication
export const login = async (credentials) => {
    // Assuming you create an /auth/login route in Flask
    const response = await api.post('/auth/login', credentials);
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

// Student API Calls (matching student.py)
export const getStudents = async (page = 1, limit = 10, filters = {}) => {
  const { data } = await api.get('/students/', {
    params: { page, per_page: limit, ...filters },
  });
  return data;
};

export const createStudent = async (studentData) => {
  const { data } = await api.post('/students/', studentData);
  return data;
};

export const updateStudent = async ({ id, ...studentData }) => {
    // The student.py PUT route takes id from URL, so we separate it
    const { data } = await api.put(`/students/${id}`, studentData);
    return data;
};

export const deleteStudent = async (id) => {
  await api.delete(`/students/${id}`);
};

// You can add other API calls here for timetable, notifications, etc.
// export const getTimetable = async (studentId) => { ... }
