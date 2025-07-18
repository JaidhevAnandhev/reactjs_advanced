// src/App.js
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import AppRoutes from './routes/AppRoutes';
import NotificationContainer from './components/ui/NotificationContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <NotificationContainer />
            <AppRoutes />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
