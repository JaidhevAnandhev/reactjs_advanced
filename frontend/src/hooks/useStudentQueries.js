// src/hooks/useStudentQueries.js

// 1. ADD THE IMPORT STATEMENT HERE
import { 
  getStudents, 
  createStudent, 
  updateStudent, 
  deleteStudent 
} from '../services'; // Clean import from the central services export

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// This hook fetches the list of students
export const useGetStudents = (page, filters) => {
  return useQuery({
    // The queryKey is an array that uniquely identifies this data
    queryKey: ['students', page, filters], 
    
    // The queryFn is the function that will be called to fetch the data.
    // We now use our imported service function here.
    queryFn: () => getStudents(page, 10, filters),
    
    // This option prevents the UI from flickering when moving between pages
    keepPreviousData: true, 
  });
};

// This hook provides a function to create a new student
export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // The mutationFn is the function that performs the action (POST request).
    // We use our imported service function here.
    mutationFn: createStudent,
    
    // After the mutation is successful, we invalidate the 'students' cache.
    // This tells TanStack Query to automatically refetch the student list.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};

// This hook provides a function to update a student
export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // The mutation function now points to our updateStudent service
    mutationFn: (variables) => updateStudent(variables.id, variables.data),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};

// This hook provides a function to delete a student
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // The mutation function now points to our deleteStudent service
    mutationFn: deleteStudent,
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};
