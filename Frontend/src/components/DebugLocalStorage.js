import React from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import { clearUserData, clearAllOldData } from '../utils/clearOldData';

const DebugLocalStorage = () => {
  const showLocalStorageInfo = () => {
    console.log('=== LOCALSTORAGE DEBUG INFO ===');
    console.log('All keys:', Object.keys(localStorage));
    Object.keys(localStorage).forEach(key => {
      console.log(`${key}:`, localStorage.getItem(key));
    });
    console.log('===============================');
  };

  return (
    <Paper sx={{ p: 2, m: 2 }}>
      <Typography variant="h6" gutterBottom>
        🔧 Debug Tools
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button 
          variant="outlined" 
          size="small"
          onClick={showLocalStorageInfo}
        >
          Show localStorage
        </Button>
        <Button 
          variant="outlined" 
          size="small" 
          color="warning"
          onClick={clearUserData}
        >
          Clear User Data
        </Button>
        <Button 
          variant="outlined" 
          size="small" 
          color="error"
          onClick={clearAllOldData}
        >
          Clear All Data
        </Button>
      </Box>
    </Paper>
  );
};

export default DebugLocalStorage;
