// src/components/auth/LoginForm.js
import React, { useState } from 'react';
import './LoginForm.css';

// Renamed onLogin to onSubmit for clarity, as it's tied to the form's submit event.
const LoginForm = ({ onSubmit, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    setError('');
    
    // *** THE FIX IS HERE ***
    // Create an object with the form data and pass it as a single argument.
    onSubmit({ email, password });
  };

  return (
    // Pass the loading state to the button to disable it during the API call
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="demo@email.com" 
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input 
          id="password" 
          name="password" 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Admin123" 
          required 
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
