// src/components/layout/Sidebar.js
import React from 'react';
import { Home, Users, Settings, LogOut, BarChart3 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './Sidebar.css';

// A reusable NavLink component for the sidebar
const NavLink = ({ icon, text, to, active }) => (
  <a href={to} className={`
    flex items-center p-3 my-1 rounded-lg transition-colors duration-200
    ${active 
      ? 'bg-blue-50 text-blue-600 dark:bg-slate-700 dark:text-white font-semibold' 
      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
    }
    group
  `}>
    {icon}
    <span className="ml-4">{text}</span>
  </a>
);

const Sidebar = () => {
  const { logout } = useAuth();
  // In a real app, you'd use react-router's `useLocation` to determine the active path
  const activePath = '/students'; 

  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-800 shadow-lg border-r border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-center h-20 border-b border-slate-200 dark:border-slate-700">
        <BarChart3 className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold ml-2 text-slate-800 dark:text-white">UniDash</h1>
      </div>
      <nav className="flex-1 px-4 py-4">
        <NavLink to="/" icon={<Home size={20} />} text="Dashboard" active={activePath === '/'} />
        <NavLink to="/students" icon={<Users size={20} />} text="Students" active={activePath === '/students'} />
        {/* Add other links here */}
      </nav>
      <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-700">
        <NavLink to="/settings" icon={<Settings size={20} />} text="Settings" />
        <button onClick={logout} className="w-full flex items-center p-3 my-1 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200">
          <LogOut size={20} />
          <span className="ml-4">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
