import React, { useState } from 'react';

const initialState = {
  name: '',
  email: '',
  password: '',
  age: '',
  gender: '',
  course: '',
  year: '',
  status: 'active',
};

const AddStudentForm = ({ onAdd }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onAdd(form);
    setForm(initialState);
    setLoading(false);
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-md mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-2">Add Student</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" required />
      <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="border p-2 rounded" required />
      <input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" className="border p-2 rounded" required />
      <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 rounded" required>
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input name="course" value={form.course} onChange={handleChange} placeholder="Course" className="border p-2 rounded" required />
      <input name="year" value={form.year} onChange={handleChange} placeholder="Year" type="number" className="border p-2 rounded" required />
      <select name="status" value={form.status} onChange={handleChange} className="border p-2 rounded" required>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <button type="submit" className="bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold py-2 rounded hover:scale-105 transition-transform duration-200" disabled={loading}>
        {loading ? 'Adding...' : 'Add Student'}
      </button>
    </form>
  );
};

export default AddStudentForm;
