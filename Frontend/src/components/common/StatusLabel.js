import React from 'react';
import { Box } from '@mui/material';
import { STATUS_COLOR } from './AppConstants';

const StatusLabel = ({ status }) => {
  const color = STATUS_COLOR[status] || '#e0e0e0'; 

  return (
    <Box 
      sx={{
        display: 'inline-block',
        px: 1,
        py: 0.5,
        borderRadius: 1,
        bgcolor: color,
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase' ,
      }}
    >
      {status}
    </Box>
  );
};

export default StatusLabel; 