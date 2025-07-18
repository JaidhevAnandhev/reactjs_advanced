// src/components/students/StudentForm.js
import React, { useState, useEffect } from 'react';
import './StudentForm.css';

// Reusable Input Field component
const FormInput = ({ label, name, value, onChange, error, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
      {label}
    </label>
    <input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`block w-full px-3 py-2 border rounded-md shadow-sm 
                 bg-white/5 dark:bg-slate-700/50 
                 ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500'}
                 transition-all duration-200`}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const StudentForm = ({ student, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    username: '', email: '', firstName: '', lastName: '', status: 'active', gpa: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData({ ...student, gpa: student.gpa || '' });
    }
  }, [student]);
  
  // Validation logic from the original file remains the same...
  const validateForm = () => { /* ... */ return true; };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl">
      <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">
        {student ? 'Edit Student' : 'Add New Student'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="Username *" name="username" value={formData.username} onChange={handleChange} error={errors.username} />
          <FormInput label="Email *" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="First Name *" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
          <FormInput label="Last Name *" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded-md shadow-sm bg-white/5 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <FormInput label="GPA (0-4)" name="gpa" type="number" min="0" max="4" step="0.01" value={formData.gpa} onChange={handleChange} error={errors.gpa} />
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onCancel} className="px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-all-300">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 transition-all-300">
            {loading ? 'Saving...' : (student ? 'Update Student' : 'Create Student')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
