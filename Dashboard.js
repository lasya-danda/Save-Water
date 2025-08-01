import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [usageData, setUsageData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsage = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/water`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsageData(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  useEffect(() => {
    fetchUsage();
  }, []);

  const chartData = {
    labels: usageData.map((entry) => entry.date),
    datasets: [
      {
        label: 'Water Usage (Liters)',
        data: usageData.map((entry) => entry.amount),
        backgroundColor: '#38bdf8',
      },
    ],
  };

  return (
    <div className="dashboard">
      <h1>Welcome to Your Water Dashboard 💧</h1>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      {loading ? (
        <p>Loading usage data...</p>
      ) : (
        <>
          <div className="chart-container">
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>

          <div className="summary">
            <h2>Recent Usage</h2>
            <ul>
              {usageData.slice(0, 5).map((entry, idx) => (
                <li key={idx}>{entry.date}: {entry.amount} liters</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
