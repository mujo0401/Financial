import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MonthlySpendingReport from '../reporting/MonthlySpendingReport.js';

const Dashboard = () => {
    const [monthlySpending, setMonthlySpending] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Added loading state
    const [error, setError] = useState(''); // Added error state

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true); // Start loading
            setError(''); // Reset error state
            try {
                const response = await axios.get('/api/dashboard'); 
                setMonthlySpending(response.data.monthlySpending);
                setIsLoading(false); // Stop loading
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setError('Failed to load dashboard data'); // Set error message
                setIsLoading(false); // Stop loading
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div>
            <h1>Spending Dashboard</h1>
            {isLoading ? (
                <p>Loading...</p> // Loading message
            ) : error ? (
                <p>Error: {error}</p> // Error message
            ) : (
                <MonthlySpendingReport data={monthlySpending} /> // Render report
            )}
            {monthlySpending.length === 0 && !isLoading && <p>No spending data available.</p>}
        </div>
    );
};

export default Dashboard;
