import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  CircularProgress,
  Fade,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  Tooltip,
  Fab,
} from '@mui/material';
import {
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Notifications as NotificationsIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationIcon,
  SensorDoor as SensorIcon,
} from '@mui/icons-material';
import alertService from '../../services/alertService';

const LEAF_GREEN = '#43a047';
const LEAF_GREEN_LIGHT = '#81c784';
const LEAF_GREEN_DARK = '#388e3c';

const AlertScreen = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAlerts();
  }, []);

  useEffect(() => {
    filterAlerts();
  }, [alerts, statusFilter, typeFilter, searchTerm]);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      console.log('🚀 Starting API call to fetch alerts...');
      const response = await alertService.getAllAlerts();
      console.log('📊 Alerts from API:', response.data);
      
      // Log detailed structure of first alert for debugging
      if (Array.isArray(response.data) && response.data.length > 0) {
        console.log('🔍 First alert structure:', JSON.stringify(response.data[0], null, 2));
        console.log('🔍 First alert status:', response.data[0].status, 'type:', typeof response.data[0].status);
      }
      
      // Log mapped status for debugging
      if (Array.isArray(response.data)) {
        console.log('🔍 Status mapping preview:');
        const mapStatus = (status) => {
          switch (status) {
            case 'ACTIVE':
            case 'CRITICAL':
              return 'Đang hoạt động';
            case 'RESOLVED':
            case 'GOOD':
              return 'Đã xử lý';
            case 'PENDING':
            case 'WARNING':
              return 'Chờ xử lý';
            default:
              return 'Không xác định';
          }
        };
        response.data.slice(0, 3).forEach(alert => {
          console.log(`  ${alert.status} → ${mapStatus(alert.status)}`);
        });
      }
      
      // Ensure we have an array of alerts
      let alertsData = response.data;
      
      // Handle different response formats
      if (Array.isArray(alertsData)) {
        console.log('✅ API returned array with', alertsData.length, 'alerts');
      } else if (alertsData && typeof alertsData === 'object') {
        console.warn('⚠️ API returned object instead of array:', alertsData);
        // Try to extract array from object
        if (alertsData.content && Array.isArray(alertsData.content)) {
          alertsData = alertsData.content;
          console.log('✅ Extracted array from content field:', alertsData.length, 'alerts');
        } else if (alertsData.data && Array.isArray(alertsData.data)) {
          alertsData = alertsData.data;
          console.log('✅ Extracted array from data field:', alertsData.length, 'alerts');
        } else if (alertsData.alerts && Array.isArray(alertsData.alerts)) {
          alertsData = alertsData.alerts;
          console.log('✅ Extracted array from alerts field:', alertsData.length, 'alerts');
        } else {
          console.warn('⚠️ Could not extract array from object, using fallback data');
          alertsData = [];
        }
      } else if (typeof alertsData === 'string') {
        console.warn('⚠️ API returned string instead of JSON:', alertsData);
        console.log('🔄 Attempting to parse JSON string...');
        try {
          const parsedData = JSON.parse(alertsData);
          if (Array.isArray(parsedData)) {
            alertsData = parsedData;
            console.log('✅ Successfully parsed JSON string to array with', alertsData.length, 'alerts');
          } else {
            console.warn('⚠️ Parsed data is not an array, using fallback data');
            alertsData = [];
          }
        } catch (parseError) {
          console.warn('⚠️ Failed to parse JSON string:', parseError.message);
          console.warn('⚠️ Using fallback data');
          alertsData = [];
        }
      } else {
        console.warn('⚠️ API response is not an array, object, or string:', alertsData);
        alertsData = [];
      }
      
      setAlerts(alertsData);
      console.log('✅ Successfully set alerts data:', alertsData.length, 'alerts');
    } catch (error) {
      console.error('❌ Error fetching alerts:', error);
      console.log('🔄 Using fallback data due to API error');
      setSnackbar({
        open: true,
        message: 'Lỗi khi tải dữ liệu cảnh báo!',
        severity: 'error'
      });
      // Fallback data with more realistic sample data
      setAlerts([
        {
          id: 1,
          message: 'Alert for sensor TemperatureCritical',
          status: 'CRITICAL',
          groupType: 's',
          timestamp: new Date().toISOString(),
          fieldName: 'Khu vực A1',
          sensorName: 'Cảm biến nhiệt độ 1'
        },
        {
          id: 2,
          message: 'Alert for sensor Soil MoistureGood',
          status: 'GOOD',
          groupType: 's',
          timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
          fieldName: 'Khu vực B2',
          sensorName: 'Cảm biến độ ẩm 2'
        },
        {
          id: 3,
          message: 'Alert for sensor HumidityWarning',
          status: 'WARNING',
          groupType: 's',
          timestamp: new Date(Date.now() - 1 * 3600000).toISOString(),
          fieldName: 'Khu vực C3',
          sensorName: 'Cảm biến độ ẩm 3'
        },
        {
          id: 4,
          message: 'Alert for sensor TemperatureGood',
          status: 'GOOD',
          groupType: 's',
          timestamp: new Date(Date.now() - 3 * 3600000).toISOString(),
          fieldName: 'Khu vực D4',
          sensorName: 'Cảm biến nhiệt độ 4'
        },
        {
          id: 5,
          message: 'Alert for sensor Soil MoistureCritical',
          status: 'CRITICAL',
          groupType: 's',
          timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
          fieldName: 'Khu vực E5',
          sensorName: 'Cảm biến độ ẩm đất 5'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filterAlerts = () => {
    // Ensure alerts is an array
    const alertsArray = Array.isArray(alerts) ? alerts : [];
    let filtered = [...alertsArray];

    // Filter by status - Updated to match actual API status values
    if (statusFilter !== 'all') {
      if (statusFilter === 'ACTIVE') {
        // Map frontend "ACTIVE" to backend "CRITICAL" only (both cases)
        filtered = filtered.filter(alert => {
          const status = String(alert.status || '').trim();
          return status === 'CRITICAL' || status === 'Critical';
        });
      } else if (statusFilter === 'RESOLVED') {
        // Map frontend "RESOLVED" to backend "GOOD" only (both cases)
        filtered = filtered.filter(alert => {
          const status = String(alert.status || '').trim();
          return status === 'GOOD' || status === 'Good';
        });
      } else if (statusFilter === 'PENDING') {
        // Map frontend "PENDING" to backend "WARNING" only (both cases)
        filtered = filtered.filter(alert => {
          const status = String(alert.status || '').trim();
          return status === 'WARNING' || status === 'Warning';
        });
      } else {
        // Direct match for any other status
        filtered = filtered.filter(alert => 
          String(alert.status || '').trim() === statusFilter
        );
      }
    }

    // Filter by type - Updated to handle 's' type and map to sensor types
    if (typeFilter !== 'all') {
      if (typeFilter === 'TEMPERATURE') {
        filtered = filtered.filter(alert => 
          alert.groupType === 's' && 
          alert.message && 
          alert.message.toLowerCase().includes('temperature')
        );
      } else if (typeFilter === 'MOISTURE') {
        filtered = filtered.filter(alert => 
          alert.groupType === 's' && 
          alert.message && 
          (alert.message.toLowerCase().includes('soil moisture') || 
           alert.message.toLowerCase().includes('humidity'))
        );
      } else if (typeFilter === 'IRRIGATION') {
        filtered = filtered.filter(alert => 
          alert.groupType === 's' && 
          alert.message && 
          alert.message.toLowerCase().includes('irrigation')
        );
      } else if (typeFilter === 'LIGHT') {
        filtered = filtered.filter(alert => 
          alert.groupType === 's' && 
          alert.message && 
          alert.message.toLowerCase().includes('light')
        );
      } else {
        filtered = filtered.filter(alert => alert.groupType === typeFilter);
      }
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(alert =>
        alert.message && alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (alert.fieldName && alert.fieldName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (alert.field?.name && alert.field.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (alert.sensorName && alert.sensorName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (alert.sensor?.name && alert.sensor.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredAlerts(filtered);
  };

  const handleResolveAlert = async (alertId) => {
    try {
      await alertService.resolveAlert(alertId);
      setSnackbar({
        open: true,
        message: 'Đã xử lý cảnh báo thành công!',
        severity: 'success'
      });
      fetchAlerts(); // Refresh data
    } catch (error) {
      console.error('Error resolving alert:', error);
      setSnackbar({
        open: true,
        message: 'Lỗi khi xử lý cảnh báo!',
        severity: 'error'
      });
    }
  };

  const handleViewDetail = (alert) => {
    setSelectedAlert(alert);
    setShowDetailDialog(true);
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'TEMPERATURE':
        return <WarningIcon color="error" />;
      case 'MOISTURE':
        return <InfoIcon color="info" />;
      case 'IRRIGATION':
        return <CheckCircleIcon color="primary" />;
      default:
        return <NotificationsIcon color="warning" />;
    }
  };

  const getAlertColor = (status) => {
    // Normalize status for comparison
    const normalizedStatus = status ? String(status).trim() : '';
    
    switch (normalizedStatus) {
      case 'ACTIVE':
      case 'CRITICAL':
      case 'Critical':
        return 'error'; // Red for critical/active
      case 'RESOLVED':
      case 'GOOD':
      case 'Good':
        return 'info'; // Blue for resolved (changed from success/green)
      case 'PENDING':
      case 'WARNING':
      case 'Warning':
        return 'warning'; // Orange for pending/warning
      default:
        return 'default';
    }
  };

  const getAlertTypeLabel = (type) => {
    switch (type) {
      case 'TEMPERATURE':
        return 'Nhiệt độ';
      case 'MOISTURE':
        return 'Độ ẩm';
      case 'IRRIGATION':
        return 'Tưới tiêu';
      case 'LIGHT':
        return 'Ánh sáng';
      case 's':
        return 'Cảm biến';
      default:
        return type || 'Không xác định';
    }
  };

  // Helper function to get sensor type from message
  const getSensorTypeFromMessage = (message) => {
    if (!message) return 'Cảm biến';
    
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('temperature')) return 'Nhiệt độ';
    if (lowerMessage.includes('humidity')) return 'Độ ẩm';
    if (lowerMessage.includes('soil moisture')) return 'Độ ẩm đất';
    if (lowerMessage.includes('irrigation')) return 'Tưới tiêu';
    if (lowerMessage.includes('light')) return 'Ánh sáng';
    
    return 'Cảm biến';
  };

  // Helper function to map backend status to frontend display label
  const getStatusDisplayLabel = (status) => {
    console.log('🔍 getStatusDisplayLabel called with status:', status, 'type:', typeof status);
    
    // Handle null, undefined, or empty status
    if (!status) {
      console.log('❌ Status is null/undefined/empty, returning Không xác định');
      return 'Không xác định';
    }
    
    // Normalize status: trim whitespace and convert to uppercase
    const normalizedStatus = String(status).trim().toUpperCase();
    console.log('🔍 Normalized status:', normalizedStatus);
    
    switch (normalizedStatus) {
      case 'ACTIVE':
      case 'CRITICAL':
        console.log('✅ Mapping to Đang hoạt động');
        return 'Đang hoạt động';
      case 'RESOLVED':
      case 'GOOD':
        console.log('✅ Mapping to Đã xử lý');
        return 'Đã xử lý';
      case 'PENDING':
      case 'WARNING':
        console.log('✅ Mapping to Chờ xử lý');
        return 'Chờ xử lý';
      default:
        // Fallback for any unknown status
        console.log('❌ Unknown status:', normalizedStatus, 'returning Không xác định');
        return 'Không xác định';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Vừa xong';
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    
    return date.toLocaleDateString('vi-VN');
  };

  const getStats = () => {
    // Ensure alerts is an array
    const alertsArray = Array.isArray(alerts) ? alerts : [];
    
    const total = alertsArray.length;
    const active = alertsArray.filter(a => {
      const status = String(a.status || '').trim();
      return status === 'CRITICAL' || status === 'Critical';
    }).length;
    const resolved = alertsArray.filter(a => {
      const status = String(a.status || '').trim();
      return status === 'GOOD' || status === 'Good';
    }).length;
    const pending = alertsArray.filter(a => {
      const status = String(a.status || '').trim();
      return status === 'WARNING' || status === 'Warning';
    }).length;

    return { total, active, resolved, pending };
  };

  const stats = getStats();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 6 }}>
        <Fade in={!loading} timeout={600}>
          <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" fontWeight={600} color={LEAF_GREEN} sx={{ mb: 1 }}>
                Quản lý Cảnh báo
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Theo dõi và xử lý các cảnh báo từ hệ thống nông nghiệp thông minh
              </Typography>
            </Box>

            {/* Statistics Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                  color: '#fff',
                  borderRadius: 3
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h4" fontWeight={600}>{stats.active}</Typography>
                        <Typography variant="body2">Đang hoạt động</Typography>
                      </Box>
                      <WarningIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                  color: '#fff',
                  borderRadius: 3
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h4" fontWeight={600}>{stats.resolved}</Typography>
                        <Typography variant="body2">Đã xử lý</Typography>
                      </Box>
                      <CheckCircleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #ffa726 0%, #ff9800 100%)',
                  color: '#fff',
                  borderRadius: 3
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h4" fontWeight={600}>{stats.pending}</Typography>
                        <Typography variant="body2">Chờ xử lý</Typography>
                      </Box>
                      <ScheduleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #43a047 0%, #388e3c 100%)',
                  color: '#fff',
                  borderRadius: 3
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h4" fontWeight={600}>{stats.total}</Typography>
                        <Typography variant="body2">Tổng cộng</Typography>
                      </Box>
                      <NotificationsIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Filters and Search */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Tìm kiếm cảnh báo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <FilterIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Trạng thái</InputLabel>
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      label="Trạng thái"
                    >
                      <MenuItem value="all">Tất cả</MenuItem>
                      <MenuItem value="ACTIVE">Đang hoạt động</MenuItem>
                      <MenuItem value="RESOLVED">Đã xử lý</MenuItem>
                      <MenuItem value="PENDING">Chờ xử lý</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Loại cảnh báo</InputLabel>
                    <Select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      label="Loại cảnh báo"
                    >
                      <MenuItem value="all">Tất cả</MenuItem>
                      <MenuItem value="TEMPERATURE">Nhiệt độ</MenuItem>
                      <MenuItem value="MOISTURE">Độ ẩm</MenuItem>
                      <MenuItem value="IRRIGATION">Tưới tiêu</MenuItem>
                      <MenuItem value="LIGHT">Ánh sáng</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={fetchAlerts}
                    startIcon={<RefreshIcon />}
                  >
                    Làm mới
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            {/* Alerts List */}
            <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
              {!Array.isArray(filteredAlerts) || filteredAlerts.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <NotificationsIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    Không có cảnh báo nào
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hiện tại không có cảnh báo nào phù hợp với bộ lọc của bạn
                  </Typography>
                </Box>
              ) : (
                <List key={`alerts-${alerts.length}-${Date.now()}`}>
                  {Array.isArray(filteredAlerts) && filteredAlerts.map((alert, index) => (
                    <React.Fragment key={alert.id}>
                      <ListItem
                        sx={{
                          p: 3,
                          '&:hover': {
                            backgroundColor: 'rgba(67, 160, 71, 0.04)',
                          },
                        }}
                      >
                        <ListItemIcon sx={{ mr: 2 }}>
                          {getAlertIcon(alert.groupType)}
                        </ListItemIcon>
                        
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                {alert.message}
                              </Typography>
                              <Chip
                                label={(() => {
                                  console.log('🎯 Rendering alert with status:', alert.status, 'type:', typeof alert.status);
                                  // Handle both uppercase and lowercase status values
                                  let label = 'Không xác định';
                                  const status = String(alert.status || '').trim();
                                  
                                  if (status === 'CRITICAL' || status === 'Critical') {
                                    label = 'Đang hoạt động';
                                  } else if (status === 'GOOD' || status === 'Good') {
                                    label = 'Đã xử lý';
                                  } else if (status === 'WARNING' || status === 'Warning') {
                                    label = 'Chờ xử lý';
                                  }
                                  
                                  console.log('🎯 Status:', status, '→ Label:', label);
                                  return label;
                                })()}
                                color={getAlertColor(alert.status)}
                                size="small"
                                sx={{ mr: 1 }}
                              />
                              <Chip
                                label={alert.groupType === 's' ? getSensorTypeFromMessage(alert.message) : getAlertTypeLabel(alert.groupType)}
                                variant="outlined"
                                size="small"
                                sx={{ mr: 1 }}
                              />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <LocationIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                                  {alert.fieldName || alert.field?.name || 'Khu vực không xác định'}
                                </Typography>
                                <SensorIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  {alert.sensorName || alert.sensor?.name || 'Cảm biến không xác định'}
                                </Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                {formatTime(alert.timestamp)}
                              </Typography>
                            </Box>
                          }
                        />
                        
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Xem chi tiết">
                            <IconButton
                              onClick={() => handleViewDetail(alert)}
                              color="primary"
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          
                          {(String(alert.status || '').trim() === 'CRITICAL' || String(alert.status || '').trim() === 'Critical') && (
                            <Tooltip title="Xử lý cảnh báo">
                              <IconButton
                                onClick={() => handleResolveAlert(alert.id)}
                                color="success"
                              >
                                <CheckCircleIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </ListItem>
                      {Array.isArray(filteredAlerts) && index < filteredAlerts.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </Paper>
          </Box>
        </Fade>

        {/* Alert Detail Dialog */}
        <Dialog
          open={showDetailDialog}
          onClose={() => setShowDetailDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {selectedAlert && getAlertIcon(selectedAlert.groupType)}
              <Typography variant="h6" sx={{ ml: 1 }}>
                Chi tiết cảnh báo
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            {selectedAlert && (
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {selectedAlert.message}
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Trạng thái
                    </Typography>
                    <Chip
                      label={(() => {
                        const status = String(selectedAlert.status || '').trim();
                        if (status === 'CRITICAL' || status === 'Critical') return 'Đang hoạt động';
                        if (status === 'GOOD' || status === 'Good') return 'Đã xử lý';
                        if (status === 'WARNING' || status === 'Warning') return 'Chờ xử lý';
                        return 'Không xác định';
                      })()}
                      color={getAlertColor(selectedAlert.status)}
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Loại cảnh báo
                    </Typography>
                    <Chip
                      label={selectedAlert.groupType === 's' ? getSensorTypeFromMessage(selectedAlert.message) : getAlertTypeLabel(selectedAlert.groupType)}
                      variant="outlined"
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Khu vực
                    </Typography>
                    <Typography variant="body1">
                      {selectedAlert.fieldName || selectedAlert.field?.name || 'Không xác định'}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Cảm biến
                    </Typography>
                    <Typography variant="body1">
                      {selectedAlert.sensorName || selectedAlert.sensor?.name || 'Không xác định'}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Thời gian
                    </Typography>
                    <Typography variant="body1">
                      {selectedAlert.timestamp ? new Date(selectedAlert.timestamp).toLocaleString('vi-VN') : 'Không xác định'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            {selectedAlert && (String(selectedAlert.status || '').trim() === 'CRITICAL' || String(selectedAlert.status || '').trim() === 'Critical') && (
              <Button
                onClick={() => {
                  handleResolveAlert(selectedAlert.id);
                  setShowDetailDialog(false);
                }}
                color="success"
                variant="contained"
                startIcon={<CheckCircleIcon />}
              >
                Xử lý cảnh báo
              </Button>
            )}
            <Button onClick={() => setShowDetailDialog(false)}>
              Đóng
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default AlertScreen;
