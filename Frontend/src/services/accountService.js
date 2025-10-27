// src/services/accountService.js
import axios from 'axios';

// Helper function to clear old tokens
const clearOldTokens = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userRole');
  console.log('🧹 Cleared old tokens from localStorage');
};

// Helper function to create simple token
const createSimpleToken = (email) => {
  const tokenData = {
    email: email,
    timestamp: Date.now()
  };
  const jsonString = JSON.stringify(tokenData);
  const simpleToken = btoa(jsonString);
  
  console.log('🔧 Creating simple token:');
  console.log('  - Token data:', tokenData);
  console.log('  - JSON string:', jsonString);
  console.log('  - Base64 token:', simpleToken);
  
  return simpleToken;
};

export const register = async (data) => {
  return axios.post(`/api/accounts/register`, data);
};

export const login = async (data) => {
  const response = await axios.post(`/api/accounts/login`, data);
  
  // Backend returns string message, not JWT token
  if (response.data === "Đăng nhập thành công!") {
    // Create a simple token-like identifier for frontend use
    const simpleToken = createSimpleToken(data.email);
    
    // Determine user role based on email (temporary solution)
    let userRole = 'user'; // default role
    if (data.email === 'admin@farm.com' || data.email === 'thienpt13042004@gmail.com') {
      userRole = 'admin';
    }
    
    // Set new token, email and role
    localStorage.setItem('token', simpleToken);
    localStorage.setItem('userEmail', data.email);
    localStorage.setItem('userRole', userRole);
    
    console.log('✅ Login successful, created simple token');
    console.log('🔍 Token created:', simpleToken);
    console.log('🔍 Email stored:', data.email);
    console.log('🔍 Role stored:', userRole);
    console.log('🔍 localStorage after setting token:', Object.keys(localStorage));
    console.log('🔍 Token verification:', localStorage.getItem('token'));
    
    // Clear any old data after setting new token
    localStorage.removeItem('apiErrors');
    localStorage.removeItem('profileData');
  } else {
    console.log('❌ Login failed:', response.data);
  }
  
  return response;
};

// Function to logout and clear tokens
export const logout = () => {
  clearOldTokens();
  console.log('✅ Logout successful, cleared tokens');
};

// Function to check if user is logged in
export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('userEmail');
  return !!(token && email);
};

// Function to get current user email
export const getCurrentUserEmail = () => {
  return localStorage.getItem('userEmail');
};

const getProfile = () => axios.get('/api/account/profile');
const updateProfile = (data) => axios.put('/api/account/profile', data);
const getToken = () => localStorage.getItem('token');
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Lấy danh sách tất cả tài khoản (chỉ admin)
const getAllAccounts = () =>
  axios.get('/api/accounts/all', { headers: getAuthHeader() });

// Cập nhật quyền tài khoản (chỉ admin)
const updateAccountRole = (id, role) =>
  axios.put(`/api/accounts/${id}/role`, { role }, { headers: getAuthHeader() });

export default {
  register,
  login,
  logout,
  isLoggedIn,
  getCurrentUserEmail,
  getProfile,
  updateProfile,
  getToken,
  getAllAccounts,
  updateAccountRole,
};
