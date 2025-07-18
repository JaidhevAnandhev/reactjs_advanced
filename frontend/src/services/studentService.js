// src/services/studentService.js
import api from './api';

// READ all students with pagination and filtering
export const getStudents = async (page = 1, limit = 10, filters = {}) => {
  const params = {
    page,
    per_page: limit,
    ...filters,
  };
  const { data } = await api.get('/students/', { params });
  return data;
};

// CREATE a new student
export const createStudent = async (studentData) => {
  const { data } = await api.post('/students/', studentData);
  return data;
};

// UPDATE an existing student
export const updateStudent = async (id, studentData) => {
  const { data } = await api.put(`/students/${id}`, studentData);
  return data;
};

// DELETE a student
export const deleteStudent = async (id) => {
  await api.delete(`/students/${id}`);
  return id; // Return the id for cache invalidation purposes
};
