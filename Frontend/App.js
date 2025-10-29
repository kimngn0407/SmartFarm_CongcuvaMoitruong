import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Farm from './pages/farm/Farm';
import Settings from './pages/settings/Settings';
import FarmManager from './pages/farm/Farm';
import FieldManager from './pages/field/Field';
import CropManager from './pages/crop/Crop';
import SensorManager from './pages/sensor/Sensor';
import AlertScreen from './pages/alert/Alert';
import HarvestRevenue from './pages/harvestrevenue/HarvestRevenue';
import HarvestScreen from './pages/harvest/Harvest';
import UserProfile from './pages/userProfile/AccountManager';
import SystemSettings from './pages/settings/Settings';
import IrrigationManager from './pages/irrigation/Irrigation';
import NotFound from './pages/NotFound';
import UnderDevelopmentPage from './pages/UnderDevelopmentPage';
import AccountManager from './pages/userProfile/AccountManager';
import Profile from './pages/userProfile/Profile';
import RoleGuard from './components/Auth/RoleGuard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
    },
    secondary: {
      main: '#2196F3',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

const App = () => {
  // Kiểm tra đăng nhập dựa vào token trong localStorage
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Luôn chuyển hướng / sang /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          {/* Các route cần đăng nhập mới truy cập được */}
          <Route element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace /> }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/farm" element={<Farm />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/farm" element={<FarmManager />} />
            <Route path="/field" element={<FieldManager />} />
            <Route path="/crop" element={<CropManager />} />
            <Route path="/sensor" element={<SensorManager />} />
            <Route path="/alert" element={<AlertScreen />} />
            <Route path="/harvest" element={<HarvestScreen />} />
            <Route path="/harvest-revenue" element={<HarvestRevenue />} />
            <Route path="/accounts" element={
              <RoleGuard allowedRoles={['ADMIN']}>
                <AccountManager />
              </RoleGuard>
            } />
            <Route path="/profile" element={<Profile />} />
            <Route path="/system" element={<SystemSettings />} />
            <Route path="/irrigation" element={<IrrigationManager />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
