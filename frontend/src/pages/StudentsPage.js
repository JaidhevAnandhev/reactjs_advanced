// src/pages/StudentsPage.js
import React, { useState, useMemo } from 'react';
import { useGetStudents, useCreateStudent, useUpdateStudent, useDeleteStudent } from '../hooks/useStudentQueries';
import { useNotifications } from '../hooks/useNotifications';
// ... import other components: StudentTable, StudentForm, Modal, icons

const StudentsPage = () => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({ search: '', status: '' });
    // ... other UI state: showForm, editingStudent, sortConfig

    const { data, isLoading, isError, error } = useGetStudents(page, filters);
    const createStudentMutation = useCreateStudent();
    const updateStudentMutation = useUpdateStudent();
    const deleteStudentMutation = useDeleteStudent();

    const { addNotification } = useNotifications();

    const handleSubmit = async (formData) => {
        try {
            if (editingStudent) {
                await updateStudentMutation.mutateAsync({ id: editingStudent.id, ...formData });
                addNotification({ type: 'success', message: 'Student updated successfully!' });
            } else {
                await createStudentMutation.mutateAsync(formData);
                addNotification({ type: 'success', message: 'Student created successfully!' });
            }
            setShowForm(false);
            setEditingStudent(null);
        } catch (err) {
            addNotification({ type: 'error', message: 'Operation failed!' });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteStudentMutation.mutateAsync(id);
                addNotification({ type: 'success', message: 'Student deleted successfully!' });
            } catch (err) {
                addNotification({ type: 'error', message: 'Delete failed!' });
            }
        }
    };

    // ... The rest of the component JSX remains largely the same, but uses `data?.result` for students,
    // `isLoading` for loading states, and passes the mutation's `isLoading` prop to buttons.

    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Students</h1>
            {/* Example filter input */}
            <input
                type="text"
                placeholder="Search students..."
                value={filters.search}
                onChange={e => setFilters({ ...filters, search: e.target.value })}
            />
            {/* Example status filter */}
            <select
                value={filters.status}
                onChange={e => setFilters({ ...filters, status: e.target.value })}
            >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
            {/* Example table */}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(data?.result || []).map(student => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.status}</td>
                            <td>
                                <button onClick={() => setEditingStudent(student)}>Edit</button>
                                <button onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Example pagination */}
            <div>
                Page: {page} / {data?.pages || 1}
                <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
                <button disabled={page >= (data?.pages || 1)} onClick={() => setPage(page + 1)}>Next</button>
            </div>
            {/* Loading indicator */}
            {isLoading && <div>Loading...</div>}
        </div>
    );
};

export default StudentsPage;
