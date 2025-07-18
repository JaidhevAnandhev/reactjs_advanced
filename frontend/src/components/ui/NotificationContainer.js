// src/components/ui/NotificationContainer.js
import React from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import './NotificationContainer.css';

const icons = {
  success: <CheckCircle className="text-white" size={24} />,
  error: <XCircle className="text-white" size={24} />,
  warning: <AlertTriangle className="text-white" size={24} />,
  info: <Info className="text-white" size={24} />,
};

const bgColors = {
  success: 'bg-gradient-to-br from-green-500 to-green-600',
  error: 'bg-gradient-to-br from-red-500 to-red-600',
  warning: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
  info: 'bg-gradient-to-br from-blue-500 to-blue-600',
};

const Notification = ({ notification, onRemove }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: '100%', transition: { duration: 0.3 } }}
      className={`relative flex items-start w-full max-w-sm p-4 rounded-xl shadow-2xl text-white ${bgColors[notification.type] || bgColors.info}`}
    >
      <div className="flex-shrink-0">{icons[notification.type]}</div>
      <div className="ml-3 flex-1">
        <p className="font-semibold">{notification.message}</p>
      </div>
      <button
        onClick={() => onRemove(notification.id)}
        className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
      >
        <XCircle size={18} />
      </button>
    </motion.div>
  );
};

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-6 right-6 z-[100] space-y-4">
      <AnimatePresence>
        {notifications.map(notification => (
          <Notification key={notification.id} notification={notification} onRemove={removeNotification} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationContainer;
