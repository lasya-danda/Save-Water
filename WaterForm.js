import React, { useState } from 'react';

function WaterForm() {
  const [usageData, setUsageData] = useState({
    shower: '',
    laundry: '',
    dishwashing: '',
    toilet: '',
    other: '',
    date: new Date().toISOString().split('T')[0], // today's date
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUsageData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5000/api/water-usage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(usageData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Water usage data saved successfully!');
        setUsageData({
          shower: '',
          laundry: '',
          dishwashing: '',
          toilet: '',
          other: '',
          date: new Date().toISOString().split('T')[0],
        });
      } else {
        setMessage(data.message || 'Failed to save data.');
      }
    } catch (err) {
      setMessage('Server error. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Track Your Daily Water Usage</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Date:
          <input type="date" name="date" value={usageData.date} onChange={handleChange} required style={styles.input} />
        </label>
        <input type="number" name="shower" placeholder="Shower (liters)" value={usageData.shower} onChange={handleChange} style={styles.input} />
        <input type="number" name="laundry" placeholder="Laundry (liters)" value={usageData.laundry} onChange={handleChange} style={styles.input} />
        <input type="number" name="dishwashing" placeholder="Dishwashing (liters)" value={usageData.dishwashing} onChange={handleChange} style={styles.input} />
        <input type="number" name="toilet" placeholder="Toilet (liters)" value={usageData.toilet} onChange={handleChange} style={styles.input} />
        <input type="number" name="other" placeholder="Other Uses (liters)" value={usageData.other} onChange={handleChange} style={styles.input} />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
  },
  form: {
    maxWidth: '500px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    fontWeight: 'bold',
    padding: '12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '15px',
    fontWeight: 'bold',
  },
};

export default WaterForm;
