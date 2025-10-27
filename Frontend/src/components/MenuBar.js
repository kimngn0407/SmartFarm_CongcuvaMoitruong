import React, { useState, useEffect } from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Typography,
    IconButton,
    useTheme,
    useMediaQuery,
    Avatar,
    Divider,
    Tooltip
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Agriculture as FarmIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    ChevronLeft as ChevronLeftIcon,
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    Person as PersonIcon,
    ExpandLess,
    ExpandMore,
    Map as FieldIcon,
    Spa as CropIcon,
    Sensors as SensorIcon,
    Warning as AlertIcon,
    MonetizationOn as RevenueIcon,
    Opacity as WaterIcon,
    Lock as AuthIcon,
    AccountCircle as UserProfileIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import RoleGuard from './Auth/RoleGuard'; // Đảm bảo đúng đường dẫn
import accountService from '../services/accountService';
import { getUserEmail, getUserRole } from '../services/authService';
import { clearUserData } from '../utils/clearOldData';

const drawerWidth = 280;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        background: 'linear-gradient(180deg,rgb(84, 94, 12) 0%,rgb(18, 67, 25) 100%)',
        color: 'white',
        borderRight: 'none',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    margin: '4px 0',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        transform: 'translateX(5px)',
        transition: 'all 0.3s ease',
    },
    '&.Mui-selected': {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
    },
    '& .MuiListItemIcon-root': {
        color: 'white',
        minWidth: '40px',
    },
    '& .MuiListItemText-root': {
        '& .MuiTypography-root': {
            fontWeight: 500,
        },
    },
}));

const MenuBar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(!isMobile);
    const [selectedItem, setSelectedItem] = useState('dashboard');
    const navigate = useNavigate();
    const location = useLocation();
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const currentPath = location.pathname;
        const matchedItem = menuItems.find(item => item.path === currentPath);
        if (matchedItem) {
            setSelectedItem(matchedItem.id);
        } else {
            setSelectedItem('dashboard');
        }

        // Hàm lấy user từ localStorage hoặc service
        const fetchUser = async () => {
            try {
                // Debug: Log tất cả localStorage
                console.log('🔍 All localStorage keys:', Object.keys(localStorage));
                console.log('🔍 userEmail:', localStorage.getItem('userEmail'));
                console.log('🔍 userRole:', localStorage.getItem('userRole'));
                console.log('🔍 token:', localStorage.getItem('token'));
                
                // Kiểm tra xem có đăng nhập không
                if (!accountService.isLoggedIn()) {
                    setUserName('');
                    setUserRole('');
                    return;
                }

                // Lấy email từ localStorage trước (nhanh hơn)
                const storedEmail = accountService.getCurrentUserEmail();
                const storedRole = getUserRole();

                if (storedEmail) {
                    setUserName(storedEmail);
                }
                
                if (storedRole) {
                    setUserRole(storedRole);
                }

                // Nếu chưa có role, thử lấy từ token
                if (!storedRole) {
                    const tokenRole = getUserRole();
                    if (tokenRole) {
                        setUserRole(tokenRole);
                    }
                }

                console.log('✅ User info loaded:', { email: storedEmail, role: storedRole });
            } catch (err) {
                console.error('❌ Error fetching user info:', err);
                setUserName('');
                setUserRole('');
            }
        };

        fetchUser();
    }, [location.pathname]);

    const menuItems = [
        {
            text: 'Dashboard ',
            icon: <DashboardIcon />,
            path: '/dashboard',
            id: 'dashboard'
        },
        {
            text: 'Farm Manager',
            icon: <FarmIcon />,
            path: '/farm',
            id: 'farm'
        },
        {
            text: 'Field Manager ',
            icon: <FieldIcon />,
            path: '/field',
            id: 'field'
        },
        {
            text: 'Crop Manager',
            icon: <CropIcon />,
            path: '/crop',
            id: 'crop'
        },
        {
            text: 'Sensor Manager ',
            icon: <SensorIcon />,
            path: '/sensor',
            id: 'sensor'
        },
        {
            text: 'Alert Screen ',
            icon: <AlertIcon />,
            path: '/alert',
            id: 'alert'
        },
        {
            text: 'Harvest & Revenue',
            icon: <RevenueIcon />,
            path: '/harvest',
            id: 'harvest'
        },
        {
            text: 'Irrigation & Fertilization',
            icon: <WaterIcon />,
            path: '/irrigation',
            id: 'irrigation'
        },
        {
            text: 'User Profile',
            icon: <UserProfileIcon />,
            path: '/profile',
            id: 'profile'
        },
        {
            text: 'System Settings ',
            icon: <SettingsIcon />,
            path: '/settings',
            id: 'settings'
        },
    ];

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleItemClick = (path, id) => {
        setSelectedItem(id);
        navigate(path);
        if (isMobile) {
            setOpen(false);
        }
    };

    const handleLogout = () => {
        accountService.logout(); // Xóa token và user data
        // Clear thêm mọi localStorage liên quan đến user
        clearUserData();
        setUserName('');
        setUserRole('');
        navigate('/login');
    };

    return (
        <>
            {isMobile && (
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{
                        position: 'fixed',
                        left: 10,
                        top: 10,
                        zIndex: 1200,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        }
                    }}
                >
                    <MenuIcon />
                </IconButton>
            )}
            <StyledDrawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={open}
                onClose={handleDrawerToggle}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    p: 2,
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                                sx={{
                                    width: 40,
                                    height: 40,
                                    mr: 1,
                                    backgroundColor: 'rgb(88, 61, 226)',
                                }}
                            >
                                <PersonIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
                                    {userName ? `Xin chào, ${userName}` : 'Xin chào'}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#fff', opacity: 0.8 }}>
                                    {userRole ? `(${userRole})` : ''}
                                </Typography>
                            </Box>
                        </Box>
                        {!isMobile && (
                            <Tooltip title="Thu gọn menu">
                                <IconButton
                                    onClick={handleDrawerToggle}
                                    sx={{
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        }
                                    }}
                                >
                                    <ChevronLeftIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mb: 2 }} />

                    <List sx={{ flexGrow: 1 }}>
                        {/* Ví dụ: chỉ ADMIN mới thấy mục quản lý tài khoản */}
                        <RoleGuard allowedRoles={['ADMIN']}>
                            <StyledListItem
                                button
                                onClick={() => handleItemClick('/accounts', 'accounts')}
                                selected={selectedItem === 'accounts'}
                            >
                                <ListItemIcon><AuthIcon /></ListItemIcon>
                                <ListItemText primary="Quản lý tài khoản" />
                            </StyledListItem>
                        </RoleGuard>
                        {/* Các mục menu khác, nếu muốn ẩn/hiện theo role thì bọc RoleGuard tương tự */}
                        {menuItems.map((item) => (
                            <StyledListItem
                                key={item.id}
                                button
                                onClick={() => handleItemClick(item.path, item.id)}
                                selected={selectedItem === item.id}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </StyledListItem>
                        ))}
                    </List>

                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />

                    <StyledListItem button onClick={handleLogout}>
                        <ListItemIcon><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="Đăng xuất" />
                    </StyledListItem>
                </Box>
            </StyledDrawer>
        </>
    );
};

export default MenuBar;