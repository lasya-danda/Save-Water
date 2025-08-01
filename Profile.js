import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data);
        } else {
          setError(data.message || 'Failed to load profile');
        }
      } catch (err) {
        setError('Network error');
      }
    };

    fetchProfile();
  }, [navigate]);

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  }

  if (!user) {
    return <div style={{ padding: '20px' }}>Loading profile...</div>;
  }

  return (
    <div style={styles.container}>
      <h2>User Profile</h2>
      <div style={styles.card}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Total Water Logged:</strong> {user.totalWaterUsage || 0} liters</p>
        <button style={styles.logoutBtn} onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#e0f7fa',
    padding: '20px',
    maxWidth: '400px',
    margin: '20px auto',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
  },
  logoutBtn: {
    marginTop: '20px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default Profile;
