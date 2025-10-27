// Utility function to clear old localStorage data
export const clearAllOldData = () => {
  console.log('🧹 Clearing all old localStorage data...');
  
  // Clear all localStorage items
  localStorage.clear();
  
  console.log('✅ All localStorage data cleared');
};

// Function to clear only user-related data
export const clearUserData = () => {
  console.log('🧹 Clearing user-related localStorage data...');
  
  const keysToRemove = [
    'token',
    'userEmail', 
    'userRole',
    'user',
    'profileData',
    'lastLoginTime',
    'apiErrors'
  ];
  
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    console.log(`  - Removed: ${key}`);
  });
  
  console.log('✅ User data cleared');
};
