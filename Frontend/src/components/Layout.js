import React from 'react';
import { Box } from '@mui/material';
import MenuBar from './MenuBar';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <Box sx={{
            display: 'flex',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}>
            <MenuBar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 0,
                    width: '100%',
                    minHeight: '100vh',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 0 20px rgba(0,0,0,0.05)',
                    borderRadius: '20px 0 0 20px',
                    overflow: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'rgba(0,0,0,0.1)',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: '4px',
                        '&:hover': {
                            background: 'rgba(0,0,0,0.3)',
                        },
                    },
                }}
            >
                {children || <Outlet />}
            </Box>
        </Box>
    );
};

export default Layout; 