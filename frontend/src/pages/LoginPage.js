// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';
import LoginForm from '../components/auth/LoginForm';
import './LoginPage.css';

const LoginPage = () => {
  const { login } = useAuth();
  const { addNotification } = useNotifications();
  const [loading, setLoading] = useState(false);
  
  // This function now correctly receives the credentials object
  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      await login(credentials);
      addNotification({ type: 'success', message: 'Login successful! Redirecting...' });
      // The redirect is handled by the router
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'Login failed. Please check your credentials.';
      addNotification({ type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h1 className="login-title">Admin Login</h1>
        <p className="login-subtitle">Access the Student Management Dashboard</p>
        {/* Pass the handleLogin function as the onSubmit prop */}
        <LoginForm onSubmit={handleLogin} loading={loading} />
      </div>
    </div>
  );
};

export default LoginPage;
