import React, { useEffect, useState } from 'react';

function WaterUsage() {
  const [usageData, setUsageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/water-usage', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUsageData(data);
        } else {
          setError(data.message || 'Failed to fetch water usage.');
        }
      } catch (err) {
        setError('Server error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Your Water Usage History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : usageData.length === 0 ? (
        <p>No usage data found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Shower</th>
              <th>Laundry</th>
              <th>Dishwashing</th>
              <th>Toilet</th>
              <th>Other</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {usageData.map((entry, index) => {
              const total = (
                Number(entry.shower || 0) +
                Number(entry.laundry || 0) +
                Number(entry.dishwashing || 0) +
                Number(entry.toilet || 0) +
                Number(entry.other || 0)
              );

              return (
                <tr key={index}>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>
                  <td>{entry.shower} L</td>
                  <td>{entry.laundry} L</td>
                  <td>{entry.dishwashing} L</td>
                  <td>{entry.toilet} L</td>
                  <td>{entry.other} L</td>
                  <td><strong>{total} L</strong></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    backgroundColor: '#f2f2f2',
    padding: '10px',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
};

export default WaterUsage;
