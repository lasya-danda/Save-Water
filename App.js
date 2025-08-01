import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import WaterForm from './components/WaterForm';

import Home from './pages/Home';
import Profile from './pages/Profile';

const isAuthenticated = () => {
  // Basic check for token (you can improve this using JWT decode/expiry checks)
  return !!localStorage.getItem('token');
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/add-usage"
          element={
            isAuthenticated() ? <WaterForm /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated() ? <Profile /> : <Navigate to="/login" />
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
