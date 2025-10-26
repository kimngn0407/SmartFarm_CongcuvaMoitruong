import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container, 
    Paper,
    Alert,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useTheme
} from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';

const contributors = [
];

const Register = () => {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'FARMER'
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return false;
        }
        if (form.password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự.');
            return false;
        }
        if (form.password !== form.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        if (!validate()) return;
        setLoading(true);
        try {
            await import('../../services/accountService').then(m => m.register({
                fullName: form.fullName,
                email: form.email,
                password: form.password,
                role: form.role
            }));
            setMessage('Đăng ký thành công! Chuyển sang trang đăng nhập...');
            setTimeout(() => navigate('/login'), 1200);
        } catch (err) {
            setError('Đăng ký thất bại! Email có thể đã tồn tại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container component="main" sx={{ minHeight: '100vh', background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)' }}>

            <Grid item xs={12} md={6} sx={{
                background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                minHeight: '100vh',
                boxShadow: '0 0 60px 0 rgba(25, 118, 210, 0.25) inset'
            }}>
                <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
                    <img
                        src={process.env.PUBLIC_URL + '/growing-plant.png'}
                        alt="Growing Plant"
                        style={{ width: '70%', maxWidth: 300, marginBottom: 24, filter: 'drop-shadow(0 8px 24px #1976d2aa)' }}
                    />
                    <Typography variant="h2" sx={{ fontWeight: 900, color: '#fff', mb: 2, letterSpacing: 2, textShadow: '2px 2px 16px #1976d2' }}>
                        SMART FARM
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 1, color: '#fff', textShadow: '1px 1px 8px #1976d2' }}>
                        Contributors
                    </Typography>
                    <List>
                        {contributors.map((name, idx) => (
                            <ListItem key={idx} sx={{ justifyContent: 'center' }}>
                                <ListItemIcon>
                                    <PersonIcon sx={{ color: '#fff', fontSize: 28, filter: 'drop-shadow(0 2px 6px #1976d2)' }} />
                                </ListItemIcon>
                                <ListItemText primary={name} primaryTypographyProps={{ fontWeight: 600, color: '#fff', fontSize: 18, textShadow: '1px 1px 8px #1976d2' }} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Grid>
            {/* Bên phải: Form đăng ký */}
            <Grid item xs={15} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
                <Container maxWidth="sm">
                    <Paper elevation={8} sx={{
                        p: 6,
                        borderRadius: 6,
                        boxShadow: '0 8px 40px 0 #1976d2cc',
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(2px)',
                        width: { xs: '100%', sm: '500px', md: '600px' },
                        maxWidth: '100%'
                    }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box sx={{
                                mb: 1,
                                animation: 'spin 2s linear infinite',
                                '@keyframes spin': {
                                    '0%': { transform: 'rotate(-10deg)' },
                                    '50%': { transform: 'rotate(10deg)' },
                                    '100%': { transform: 'rotate(-10deg)' }
                                }
                            }}>
                                <PersonAddAltIcon color="primary" sx={{ fontSize: 60 }} />
                            </Box>
                            <Typography component="h1" variant="h3" sx={{ fontWeight: 1200, mb: 2, color: '#1976D2', letterSpacing: 1 }}>
                                Đăng ký tài khoản
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                                {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="fullName"
                                    label="Họ và tên"
                                    name="fullName"
                                    autoComplete="name"
                                    autoFocus
                                    value={form.fullName}
                                    onChange={handleChange}
                                    sx={{
                                        background: '#e3f2fd',
                                        borderRadius: 2,
                                        fontSize: 22,
                                        height: 60,
                                        '& input': { fontSize: 22, padding: '18px 14px' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: '#1976D2' },
                                            '&:hover fieldset': { borderColor: '#43cea2' },
                                            '&.Mui-focused fieldset': { borderColor: '#43cea2', boxShadow: '0 0 0 2px #43cea255' }
                                        }
                                    }}
                                    InputLabelProps={{ style: { color: '#1976D2', fontWeight: 600, fontSize: 20 } }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    sx={{
                                        background: '#e3f2fd',
                                        borderRadius: 2,
                                        fontSize: 22,
                                        height: 60,
                                        '& input': { fontSize: 22, padding: '18px 14px' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: '#1976D2' },
                                            '&:hover fieldset': { borderColor: '#43cea2' },
                                            '&.Mui-focused fieldset': { borderColor: '#43cea2', boxShadow: '0 0 0 2px #43cea255' }
                                        }
                                    }}
                                    InputLabelProps={{ style: { color: '#1976D2', fontWeight: 600, fontSize: 20 } }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mật khẩu"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={form.password}
                                    onChange={handleChange}
                                    sx={{
                                        background: '#e3f2fd',
                                        borderRadius: 2,
                                        fontSize: 22,
                                        height: 60,
                                        '& input': { fontSize: 22, padding: '18px 14px' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: '#1976D2' },
                                            '&:hover fieldset': { borderColor: '#43cea2' },
                                            '&.Mui-focused fieldset': { borderColor: '#43cea2', boxShadow: '0 0 0 2px #43cea255' }
                                        }
                                    }}
                                    InputLabelProps={{ style: { color: '#1976D2', fontWeight: 600, fontSize: 20 } }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Xác nhận mật khẩu"
                                    type="password"
                                    id="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    sx={{
                                        background: '#e3f2fd',
                                        borderRadius: 2,
                                        fontSize: 22,
                                        height: 60,
                                        '& input': { fontSize: 22, padding: '18px 14px' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: '#1976D2' },
                                            '&:hover fieldset': { borderColor: '#43cea2' },
                                            '&.Mui-focused fieldset': { borderColor: '#43cea2', boxShadow: '0 0 0 2px #43cea255' }
                                        }
                                    }}
                                    InputLabelProps={{ style: { color: '#1976D2', fontWeight: 600, fontSize: 20 } }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        mt: 3,
                                        mb: 1,
                                        fontWeight: 900,
                                        fontSize: 24,
                                        height: 60,
                                        letterSpacing: 1,
                                        borderRadius: 3,
                                        boxShadow: '0 4px 24px 0 #43cea2cc',
                                        background: 'linear-gradient(90deg, #43cea2 0%, #1976D2 100%)',
                                        transition: '0.2s',
                                        '&:hover': {
                                            background: 'linear-gradient(90deg, #1976D2 0%, #43cea2 100%)',
                                            boxShadow: '0 8px 32px 0 #1976d2cc',
                                            transform: 'scale(1.03)'
                                        }
                                    }}
                                    disabled={loading}
                                    startIcon={<PersonAddAltIcon />}
                                >
                                    {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                                </Button>
                                <Box sx={{ textAlign: 'center', mt: 2 }}>
                                    <Typography variant="body2" sx={{ mb: 1, color: '#1976D2', fontWeight: 600 }}>
                                        Đã có tài khoản?
                                    </Typography>
                                    <Button
                                        component={Link}
                                        to="/login"
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<LoginIcon />}
                                        fullWidth
                                        sx={{
                                            fontWeight: 700,
                                            borderRadius: 3,
                                            borderWidth: 2,
                                            fontSize: 18,
                                            letterSpacing: 1,
                                            background: 'rgba(67,206,162,0.07)',
                                            borderColor: '#43cea2',
                                            color: '#1976D2',
                                            transition: '0.2s',
                                            '&:hover': {
                                                background: 'linear-gradient(90deg, #43cea2 0%, #1976D2 100%)',
                                                color: '#fff',
                                                borderColor: '#1976D2',
                                                transform: 'scale(1.03)'
                                            }
                                        }}
                                    >
                                        Đăng nhập
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Grid>
        </Grid>
    );
};

export default Register; 