import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Switch,
    Divider,
    Button
} from '@mui/material';
import {
    Notifications as NotificationsIcon,
    Security as SecurityIcon,
    Language as LanguageIcon,
    Palette as PaletteIcon
} from '@mui/icons-material';

const Settings = () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const handleNotificationChange = () => {
        setNotifications(!notifications);
    };

    const handleDarkModeChange = () => {
        setDarkMode(!darkMode);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Cài đặt
            </Typography>

            <Paper elevation={3} sx={{ p: 2, maxWidth: 600 }}>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <NotificationsIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Thông báo"
                            secondary="Bật/tắt thông báo hệ thống"
                        />
                        <Switch
                            checked={notifications}
                            onChange={handleNotificationChange}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon>
                            <PaletteIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Chế độ tối"
                            secondary="Bật/tắt chế độ tối"
                        />
                        <Switch
                            checked={darkMode}
                            onChange={handleDarkModeChange}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon>
                            <LanguageIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Ngôn ngữ"
                            secondary="Tiếng Việt"
                        />
                        <Button variant="outlined" size="small">
                            Thay đổi
                        </Button>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon>
                            <SecurityIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Bảo mật"
                            secondary="Cài đặt bảo mật tài khoản"
                        />
                        <Button variant="outlined" size="small">
                            Cập nhật
                        </Button>
                    </ListItem>
                </List>
            </Paper>
        </Box>
    );
};

export default Settings; 