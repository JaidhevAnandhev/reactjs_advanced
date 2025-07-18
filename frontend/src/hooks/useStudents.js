// src/hooks/useStudentQueries.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../services/api';

export const useGetStudents = (page, filters) => {
  return useQuery({
    queryKey: ['students', page, filters], // Caching key
    queryFn: () => api.getStudents(page, 10, filters),
    keepPreviousData: true, // Prevents UI flicker on pagination
  });
};

export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createStudent,
    onSuccess: () => {
      // When a student is created, invalidate the students query to refetch data
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.updateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};

export const useDeleteStudent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.deleteStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
        },
    });
};
