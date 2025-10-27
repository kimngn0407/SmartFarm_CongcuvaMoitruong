// src/services/authService.js
import accountService from './accountService';

export const getToken = () => accountService.getToken();

// Helper function to decode simple token (not JWT)
const decodeSimpleToken = (token) => {
  try {
    const jsonString = atob(token);
    return JSON.parse(jsonString);
  } catch (err) {
    console.error('Simple token decode error:', err);
    return null;
  }
};

export const getUserRole = () => {
  // Trong hệ thống hiện tại, role được hardcode hoặc lưu riêng
  // Tạm thời return 'admin' hoặc lấy từ localStorage nếu có
  const savedRole = localStorage.getItem('userRole');
  if (savedRole) {
    return savedRole;
  }
  
  // Mặc định admin cho tài khoản đầu tiên
  const email = accountService.getCurrentUserEmail();
  if (email === 'admin@farm.com' || email === 'thienpt13042004@gmail.com') {
    return 'admin';
  }
  
  return 'user'; // Default role
};

export const getUserEmail = () => {
  // Lấy email từ accountService thay vì decode token
  return accountService.getCurrentUserEmail();
};
