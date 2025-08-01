import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>💧 SaveWater – Water Usage Tracker for Homes</h1>
      <p>Track, manage, and reduce your daily water usage with ease.</p>

      <div className="home-buttons">
        <Link to="/login" className="btn login-btn">Login</Link>
        <Link to="/register" className="btn register-btn">Register</Link>
      </div>

      <section className="features">
        <h2>Why Use SaveWater?</h2>
        <ul>
          <li>✅ Monitor daily water consumption</li>
          <li>✅ Set and achieve conservation goals</li>
          <li>✅ Understand usage trends with charts</li>
          <li>✅ Save on water bills and help the planet</li>
        </ul>
      </section>
    </div>
  );
}

export default Home;
