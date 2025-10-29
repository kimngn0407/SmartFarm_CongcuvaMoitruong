// src/components/RoleGuard.jsx
import { useEffect, useState } from 'react';

const RoleGuard = ({ allowedRoles, children }) => {
  const [hasRole, setHasRole] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = () => {
      const token = localStorage.getItem('token');
      console.log('🔍 RoleGuard checking token:', token ? `exists (${token.substring(0, 20)}...)` : 'not found');
      console.log('🔍 Full token value:', token);
      console.log('🔍 localStorage keys:', Object.keys(localStorage));
      
      if (token) {
        try {
          // Validate if token is a valid base64 string
          if (!isValidBase64(token)) {
            console.warn('⚠️ Invalid token format, clearing old token');
            console.log('Token that failed validation:', token);
            localStorage.removeItem('token');
            setHasRole(false);
            setLoading(false);
            return;
          }

          // Decode simple token (not JWT)
          const decoded = atob(token);
          console.log('🔍 Decoded token string:', decoded);
          
          const userInfo = JSON.parse(decoded);
          console.log('🔍 Parsed user info:', userInfo);
          
          // Validate userInfo has required fields
          if (!userInfo.email) {
            console.warn('⚠️ Token missing email, clearing invalid token');
            localStorage.removeItem('token');
            setHasRole(false);
            setLoading(false);
            return;
          }
          
          // For now, assume user has access if token exists and is valid
          // In a real app, you'd check the actual role from backend
          console.log('✅ RoleGuard - Valid token found, allowing access');
          
          // Since backend doesn't return role in token, we'll allow access
          // and let the backend handle role checking
          setHasRole(true);
        } catch (err) {
          console.error('❌ Error decoding simple token:', err);
          console.log('Token that caused error:', token);
          
          // Be more conservative about clearing tokens
          // Only clear if it's definitely a base64 decode error
          if (err.name === 'InvalidCharacterError') {
            console.warn('⚠️ Clearing invalid token due to base64 decode error');
            localStorage.removeItem('token');
            setHasRole(false);
          } else {
            // For other errors (like JSON parse), just deny access but don't clear token
            console.warn('⚠️ Token decode error, denying access but keeping token');
            setHasRole(false);
          }
        }
      } else {
        console.log('ℹ️ No token found, denying access');
        setHasRole(false);
      }
      setLoading(false);
    };

    // Add a retry mechanism for timing issues
    let retryCount = 0;
    const maxRetries = 5; // Increased retries
    
    const attemptCheckRole = () => {
      const token = localStorage.getItem('token');
      
      if (!token && retryCount < maxRetries) {
        retryCount++;
        console.log(`🔄 Retry ${retryCount}/${maxRetries} - waiting for token...`);
        setTimeout(attemptCheckRole, 300); // Increased delay
        return;
      }
      
      checkRole();
    };

    // Start with a longer delay to ensure token is stored
    const timeoutId = setTimeout(attemptCheckRole, 1000); // Increased initial delay even more
    
    return () => clearTimeout(timeoutId);
  }, [allowedRoles]);

  // Helper function to validate base64 string
  const isValidBase64 = (str) => {
    try {
      // Check if string is not undefined or null
      if (!str || typeof str !== 'string') {
        console.log('❌ Token is not a valid string:', str);
        return false;
      }
      
      // Check if string contains only valid base64 characters
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
      if (!base64Regex.test(str)) {
        console.log('❌ Token failed regex validation:', str);
        return false;
      }
      
      // Try to decode to see if it's valid
      atob(str);
      console.log('✅ Token passed base64 validation');
      return true;
    } catch (error) {
      console.log('❌ Token failed base64 decode:', error.message);
      return false;
    }
  };

  // Show loading state briefly
  if (loading) {
    return null;
  }

  return hasRole ? children : null;
};

export default RoleGuard;
