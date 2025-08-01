const API_BASE_URL = "http://localhost:5000"; // Change if deployed

// Helper function to get the auth token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Register a new user
export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

// Login user
export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
};

// Get profile info
export const fetchProfile = async () => {
  const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

// Submit water usage
export const submitWaterUsage = async (data) => {
  const res = await fetch(`${API_BASE_URL}/api/water-usage`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

// Get all water usage records
export const getWaterUsage = async () => {
  const res = await fetch(`${API_BASE_URL}/api/water-usage`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};
