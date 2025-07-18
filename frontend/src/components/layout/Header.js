// src/components/layout/Header.js
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { useNotifications } from '../../hooks/useNotifications';
import { Sun, Moon, Bell, Search } from 'lucide-react';
import './Header.css';

const Header = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications } = useNotifications();

  return (
    <header className="flex items-center justify-between h-20 px-6 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
      {/* Search Bar (can be made functional later) */}
      <div className="relative hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 w-64 border-none rounded-lg bg-slate-100 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 transition-all-300"
        />
      </div>

      {/* Right-side controls */}
      <div className="flex items-center space-x-4 ml-auto">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
        </button>

        <div className="relative">
          <button className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <Bell size={22} />
          </button>
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs items-center justify-center">
                {notifications.length}
              </span>
            </span>
          )}
        </div>

        <div className="flex items-center space-x-3 pl-2 border-l border-slate-200 dark:border-slate-700">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="hidden sm:block">
                <p className="font-semibold text-sm text-slate-800 dark:text-white">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
