import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';
import { keyframes } from '@mui/system';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container disableGutters sx={{ minWidth: '100vw', minHeight: '100vh', p: 0, m: 0 }}>
            <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    py: 4,
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    borderRadius: 0,
                    boxShadow: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                        zIndex: 1
                    }
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        animation: `${float} 6s ease-in-out infinite`,
                        zIndex: 2
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '8rem', md: '12rem' },
                            fontWeight: 'bold',
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                            mb: 2
                        }}
                    >
                        404
                    </Typography>
                </Box>

                <Typography
                    variant="h4"
                    sx={{
                        mb: 3,
                        color: '#2c3e50',
                        fontWeight: 'bold',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                        zIndex: 2
                    }}
                >
                    Oops! Trang bạn đang tìm kiếm không tồn tại
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        mb: 4,
                        color: '#34495e',
                        maxWidth: '600px',
                        fontSize: '1.1rem',
                        lineHeight: 1.6,
                        zIndex: 2
                    }}
                >
                    Có vẻ như trang bạn đang tìm kiếm đã bị di chuyển hoặc không tồn tại.
                    Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ.
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    startIcon={<HomeIcon />}
                    onClick={() => navigate('/')}
                    sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: '30px',
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 5px 8px 2px rgba(33, 203, 243, .4)',
                        },
                        zIndex: 2
                    }}
                >
                    Quay về trang chủ
                </Button>
                <Box
                    sx={{
                        position: 'absolute',
                        width: '300px',
                        height: '300px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(33,150,243,0.1) 0%, rgba(33,203,243,0) 70%)',
                        top: '-150px',
                        right: '-150px',
                        zIndex: 1
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(33,150,243,0.1) 0%, rgba(33,203,243,0) 70%)',
                        bottom: '-100px',
                        left: '-100px',
                        zIndex: 1
                    }}
                />
            </Box>
        </Container>
    );
};

export default NotFound; 