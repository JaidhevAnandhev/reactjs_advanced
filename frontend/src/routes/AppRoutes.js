// src/routes/AppRoutes.js
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import StudentsPage from '../pages/StudentsPage';
import { useAuth } from '../hooks/useAuth';

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    return (
        // Add the new v7_relativeSplatPath flag to the existing future prop
        <BrowserRouter future={{ 
            v7_startTransition: true,
            v7_relativeSplatPath: true 
        }}>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route 
                        path="/login" 
                        element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} 
                    />
                    <Route path="/" element={<ProtectedRoute />}>
                        <Route index element={<DashboardPage />} />
                        <Route path="students" element={<StudentsPage />} />
                        {/* Add other protected routes here */}
                    </Route>
                    {/* This is your splat route */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRoutes;
