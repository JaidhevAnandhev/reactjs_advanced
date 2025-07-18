// src/components/students/StudentTable.js
import React from 'react';
import { ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react';
import './StudentTable.css';

const StudentTable = ({ students, sortField, sortDirection, onSort, onEdit, onDelete }) => {
  const headers = [
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'firstName', label: 'First Name' },
    { key: 'status', label: 'Status' },
    { key: 'gpa', label: 'GPA' },
  ];

  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        <thead className="bg-slate-50 dark:bg-slate-700/50">
          <tr>
            {headers.map(({ key, label }) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-300 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort(key)}
              >
                <div className="flex items-center space-x-1">{label} {renderSortIcon(key)}</div>
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
          {students.map(student => (
            <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{student.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{student.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{student.firstName}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                  student.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400' 
                    : 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-400'
                }`}>
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{student.gpa}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button onClick={() => onEdit(student)} className="p-2 rounded-full text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-500/10 transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => onDelete(student.id)} className="p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-500/10 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
