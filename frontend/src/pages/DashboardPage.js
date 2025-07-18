// src/pages/DashboardPage.js
import React, { useEffect, useMemo } from 'react';
import { useGetStudents, useCreateStudent } from '../hooks/useStudents';
import StatCard from '../components/dashboard/StatCard';
import { Users, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import './DashboardPage.css';
import AddStudentForm from '../components/dashboard/AddStudentForm';
import axios from 'axios';

const DashboardPage = () => {
    const { data, isLoading } = useGetStudents(1, {});
    const students = data?.data?.result || [];
    const totalStudents = data?.data?.total || 0;
    const activeStudents = students.filter(s => s.status === 'active').length;
    const inactiveStudents = totalStudents - activeStudents;
    const avgGpa = students.reduce((acc, s) => acc + parseFloat(s.gpa || 0), 0) / (students.length || 1);
    const stats = { totalStudents, activeStudents, inactiveStudents, avgGpa };

    const createStudentMutation = useCreateStudent();
    const handleAddStudent = async (studentData) => {
        await createStudentMutation.mutateAsync(studentData);
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="stat-card">
                    <span className="stat-icon"><Users /></span>
                    <div className="stat-label">Total Students</div>
                    <div className="stat-value">{stats.totalStudents}</div>
                </div>
                <div className="stat-card stat-card-green">
                    <span className="stat-icon"><CheckCircle /></span>
                    <div className="stat-label">Active Students</div>
                    <div className="stat-value">{stats.activeStudents}</div>
                </div>
                <div className="stat-card stat-card-red">
                    <span className="stat-icon"><XCircle /></span>
                    <div className="stat-label">Inactive Students</div>
                    <div className="stat-value">{stats.inactiveStudents}</div>
                </div>
                <div className="stat-card stat-card-blue">
                    <span className="stat-icon"><BookOpen /></span>
                    <div className="stat-label">Average GPA</div>
                    <div className="stat-value">{stats.avgGpa.toFixed(2)}</div>
                </div>
            </div>
            <AddStudentForm onAdd={handleAddStudent} />
            {/* Add more charts or data visualizations here */}
        </div>
    );
};

export default DashboardPage;
