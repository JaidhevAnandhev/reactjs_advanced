// src/components/dashboard/StatCard.js
import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700
                   hover:shadow-xl hover:-translate-y-2 transform transition-all-300 group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-slate-800 dark:text-white mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-gradient-to-br ${colorClasses[color]} text-white shadow-lg`}>
          {React.cloneElement(icon, { size: 24 })}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
