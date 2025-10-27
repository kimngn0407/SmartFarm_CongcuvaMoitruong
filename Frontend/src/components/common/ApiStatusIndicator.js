import React, { useState, useEffect } from 'react';
import { 
  Alert, 
  AlertTitle, 
  Box, 
  Typography, 
  Chip,
  Collapse,
  IconButton,
  Button
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import profileService from '../../services/profileService';

const ApiStatusIndicator = () => {
  const [apiStatus, setApiStatus] = useState({
    profile: 'unknown',
    update: 'unknown',
    password: 'unknown'
  });
  const [showDetails, setShowDetails] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = () => {
    const storedProfile = localStorage.getItem('profileData');
    const isInFallbackMode = profileService.isInFallbackMode();
    
    setApiStatus({
      profile: storedProfile ? 'working' : 'unknown',
      update: isInFallbackMode ? 'fallback' : 'unknown',
      password: isInFallbackMode ? 'fallback' : 'unknown'
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Try to test API connectivity
      await profileService.getProfile('coi31052004@gmail.com');
      // If successful, clear fallback mode
      profileService.clearFallbackMode();
      checkApiStatus();
    } catch (error) {
      console.log('API still not available');
    } finally {
      setIsRefreshing(false);
    }
  };

  const getOverallStatus = () => {
    const statuses = Object.values(apiStatus);
    if (statuses.includes('error')) return 'error';
    if (statuses.includes('fallback')) return 'warning';
    if (statuses.includes('unknown')) return 'info';
    return 'success';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'working': return 'success';
      case 'fallback': return 'warning';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'working': return <CheckCircleIcon fontSize="small" />;
      case 'fallback': return <WarningIcon fontSize="small" />;
      case 'error': return <ErrorIcon fontSize="small" />;
      default: return <InfoIcon fontSize="small" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'working': return 'Hoạt động';
      case 'fallback': return 'Chế độ dự phòng';
      case 'error': return 'Lỗi';
      default: return 'Không xác định';
    }
  };

  const overallStatus = getOverallStatus();

  if (!isVisible) return null;

  return (
    <Box sx={{ mb: 2 }}>
      <Alert 
        severity={overallStatus}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              size="small"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={isRefreshing}
              sx={{ 
                color: 'inherit', 
                textTransform: 'none',
                minWidth: 'auto'
              }}
            >
              {isRefreshing ? 'Đang kiểm tra...' : 'Kiểm tra lại'}
            </Button>
            <IconButton
              size="small"
              onClick={() => setShowDetails(!showDetails)}
              sx={{ color: 'inherit' }}
            >
              <InfoIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => setIsVisible(false)}
              sx={{ color: 'inherit' }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        }
      >
        <AlertTitle>
          Trạng thái API
        </AlertTitle>
        <Typography variant="body2">
          {overallStatus === 'success' && 'Tất cả API đang hoạt động bình thường'}
          {overallStatus === 'warning' && 'Một số tính năng đang sử dụng chế độ dự phòng'}
          {overallStatus === 'error' && 'Có lỗi xảy ra với API'}
          {overallStatus === 'info' && 'Đang kiểm tra trạng thái API'}
        </Typography>
      </Alert>

      <Collapse in={showDetails}>
        <Box sx={{ mt: 1, p: 2, bgcolor: 'background.paper', borderRadius: 1, border: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Chi tiết trạng thái:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ minWidth: 80 }}>
                Profile:
              </Typography>
              <Chip
                icon={getStatusIcon(apiStatus.profile)}
                label={getStatusText(apiStatus.profile)}
                color={getStatusColor(apiStatus.profile)}
                size="small"
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ minWidth: 80 }}>
                Update:
              </Typography>
              <Chip
                icon={getStatusIcon(apiStatus.update)}
                label={getStatusText(apiStatus.update)}
                color={getStatusColor(apiStatus.update)}
                size="small"
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ minWidth: 80 }}>
                Password:
              </Typography>
              <Chip
                icon={getStatusIcon(apiStatus.password)}
                label={getStatusText(apiStatus.password)}
                color={getStatusColor(apiStatus.password)}
                size="small"
              />
            </Box>
          </Box>
          
          {overallStatus === 'warning' && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                💡 Chế độ dự phòng: Dữ liệu được lưu cục bộ và sẽ được đồng bộ khi API khả dụng.
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                • Profile updates được lưu trong localStorage
                • Password changes được mô phỏng
                • Dữ liệu sẽ được đồng bộ khi backend API sẵn sàng
              </Typography>
            </Box>
          )}

          {overallStatus === 'success' && (
            <Typography variant="body2" sx={{ mt: 2, color: 'success.main' }}>
              ✅ Tất cả tính năng đang hoạt động bình thường với backend API.
            </Typography>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default ApiStatusIndicator; 