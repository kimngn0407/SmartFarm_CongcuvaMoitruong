import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
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
  Tooltip,
  Fab,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Avatar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Agriculture as AgricultureIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Schedule as ScheduleIcon,
  Grass as GrassIcon,
  LocalFlorist as LocalFloristIcon,
  Eco as EcoIcon,
  Scale as ScaleIcon,
  Star as StarIcon,
  StarHalf as StarHalfIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';
import harvestService from '../../services/harvestService';
import fieldService from '../../services/fieldService';
import cropService from '../../services/cropService';

const LEAF_GREEN = '#43a047';
const LEAF_GREEN_LIGHT = '#81c784';
const LEAF_GREEN_DARK = '#388e3c';

const HarvestScreen = () => {
  const [harvests, setHarvests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHarvest, setSelectedHarvest] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, scheduled: 0, totalQuantity: 0 });
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('all');
  const [fieldFilter, setFieldFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    fieldId: '',
    cropType: '',
    harvestDate: '',
    quantity: '',
    quality: '',
    notes: ''
  });

  useEffect(() => {
    fetchHarvests();
    fetchStats();
  }, []);

  const fetchHarvests = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching harvests from API...');
      
      const response = await harvestService.getAllHarvests();
      console.log('✅ API Response:', response.data);
      
      setHarvests(response.data);
    } catch (error) {
      console.error('❌ Error fetching harvests:', error);
      setSnackbar({
        open: true,
        message: 'Lỗi khi tải dữ liệu thu hoạch!',
        severity: 'error'
      });
      
      // Fallback to mock data if API fails
      const mockHarvests = [
        {
          id: 1,
          fieldName: 'Field 1',
          cropType: 'Lettuce',
          harvestDate: '2025-05-15',
          quantity: 2500,
          quality: 'Tốt',
          status: 'COMPLETED',
          notes: 'Thu hoạch đúng thời vụ, năng suất cao'
        },
        {
          id: 2,
          fieldName: 'Field 2',
          cropType: 'Tomato',
          harvestDate: '2025-05-20',
          quantity: 1800,
          quality: 'Khá',
          status: 'COMPLETED',
          notes: 'Thu hoạch sớm hơn dự kiến'
        },
        {
          id: 3,
          fieldName: 'Field 3',
          cropType: 'Rice',
          harvestDate: '2025-05-25',
          quantity: 500,
          quality: 'Tốt',
          status: 'PENDING',
          notes: 'Chuẩn bị thu hoạch'
        },
        {
          id: 4,
          fieldName: 'Field 1',
          cropType: 'Corn',
          harvestDate: '2025-06-01',
          quantity: 1200,
          quality: 'Tốt',
          status: 'SCHEDULED',
          notes: 'Dự kiến thu hoạch'
        }
      ];
      
      setHarvests(mockHarvests);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await harvestService.getHarvestStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Use calculated stats from harvests data
      const calculatedStats = getStats();
      setStats(calculatedStats);
    }
  };

  const handleAddHarvest = () => {
    setFormData({
      fieldId: '',
      cropType: 'Lettuce',
      harvestDate: '',
      quantity: '',
      quality: 'Tốt',
      notes: ''
    });
    setShowAddDialog(true);
  };

  const handleEditHarvest = (harvest) => {
    setFormData({
      fieldId: harvest.fieldName,
      cropType: harvest.cropType,
      harvestDate: harvest.harvestDate,
      quantity: harvest.quantity.toString(),
      quality: harvest.quality,
      notes: harvest.notes
    });
    setSelectedHarvest(harvest);
    setShowEditDialog(true);
  };

  const handleViewDetail = (harvest) => {
    setSelectedHarvest(harvest);
    setShowDetailDialog(true);
  };

  const handleDeleteHarvest = async (harvestId) => {
    try {
      console.log('🗑️ Deleting harvest:', harvestId);
      await harvestService.deleteHarvest(harvestId);
      
      setHarvests(harvests.filter(h => h.id !== harvestId));
      setSnackbar({
        open: true,
        message: 'Đã xóa thông tin thu hoạch!',
        severity: 'success'
      });
      
      // Refresh stats after deletion
      fetchStats();
    } catch (error) {
      console.error('Error deleting harvest:', error);
      setSnackbar({
        open: true,
        message: 'Lỗi khi xóa thông tin thu hoạch!',
        severity: 'error'
      });
    }
  };

  const handleSaveHarvest = async () => {
    try {
      console.log('💾 Saving harvest data:', formData);
      
      const harvestData = {
        fieldId: formData.fieldId ? parseInt(formData.fieldId.replace('Field ', '')) : null,
        cropType: formData.cropType,
        harvestDate: formData.harvestDate,
        quantity: parseFloat(formData.quantity),
        quality: formData.quality,
        notes: formData.notes || '' // Ensure notes is empty string if not provided
      };

      if (showEditDialog) {
        // Update existing harvest
        const response = await harvestService.updateHarvest(selectedHarvest.id, harvestData);
        setHarvests(harvests.map(h => 
          h.id === selectedHarvest.id ? response.data : h
        ));
        setSnackbar({
          open: true,
          message: 'Đã cập nhật thông tin thu hoạch!',
          severity: 'success'
        });
      } else {
        // Add new harvest
        const response = await harvestService.createHarvest(harvestData);
        setHarvests([...harvests, response.data]);
        setSnackbar({
          open: true,
          message: 'Đã thêm thông tin thu hoạch!',
          severity: 'success'
        });
      }
      
      setShowAddDialog(false);
      setShowEditDialog(false);
      
      // Refresh stats after save
      fetchStats();
    } catch (error) {
      console.error('Error saving harvest:', error);
      setSnackbar({
        open: true,
        message: 'Lỗi khi lưu thông tin thu hoạch!',
        severity: 'error'
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'SCHEDULED':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'Đã hoàn thành';
      case 'PENDING':
        return 'Đang thực hiện';
      case 'SCHEDULED':
        return 'Đã lên lịch';
      default:
        return status;
    }
  };

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'Tốt':
        return 'success';
      case 'Khá':
        return 'warning';
      case 'Trung bình':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStats = () => {
    const total = harvests.length;
    const completed = harvests.filter(h => h.status === 'COMPLETED').length;
    const pending = harvests.filter(h => h.status === 'PENDING').length;
    const scheduled = harvests.filter(h => h.status === 'SCHEDULED').length;
    const totalQuantity = harvests.reduce((sum, h) => sum + (h.quantity || 0), 0);

    return { total, completed, pending, scheduled, totalQuantity };
  };

  const filteredHarvests = harvests.filter(harvest => {
    const matchesStatus = statusFilter === 'all' || harvest.status === statusFilter;
    const matchesField = fieldFilter === 'all' || harvest.fieldName === fieldFilter;
    const matchesSearch = !searchTerm || 
      harvest.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      harvest.fieldName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (harvest.notes && harvest.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesStatus && matchesField && matchesSearch;
  });

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
                Quản lý Thu hoạch
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Theo dõi và quản lý thông tin thu hoạch từ các khu vực canh tác
              </Typography>
            </Box>

            {/* Statistics Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
                  color: '#fff',
                  borderRadius: 3
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h4" fontWeight={600}>{stats.completed}</Typography>
                        <Typography variant="body2">Đã hoàn thành</Typography>
                      </Box>
                      <CheckCircleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                  color: '#fff',
                  borderRadius: 3
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h4" fontWeight={600}>{stats.pending}</Typography>
                        <Typography variant="body2">Đang thực hiện</Typography>
                      </Box>
                      <ScheduleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                  color: '#fff',
                  borderRadius: 3
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h4" fontWeight={600}>{stats.scheduled}</Typography>
                        <Typography variant="body2">Đã lên lịch</Typography>
                      </Box>
                      <CalendarIcon sx={{ fontSize: 40, opacity: 0.8 }} />
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
                        <Typography variant="h4" fontWeight={600}>{stats.totalQuantity.toLocaleString()}</Typography>
                        <Typography variant="body2">Tổng sản lượng (kg)</Typography>
                      </Box>
                      <TrendingUpIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Filters and Actions */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Tìm kiếm thu hoạch..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <FilterIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth>
                    <InputLabel>Trạng thái</InputLabel>
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      label="Trạng thái"
                    >
                      <MenuItem value="all">Tất cả</MenuItem>
                      <MenuItem value="COMPLETED">Đã hoàn thành</MenuItem>
                      <MenuItem value="PENDING">Đang thực hiện</MenuItem>
                      <MenuItem value="SCHEDULED">Đã lên lịch</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth>
                    <InputLabel>Khu vực</InputLabel>
                    <Select
                      value={fieldFilter}
                      onChange={(e) => setFieldFilter(e.target.value)}
                      label="Khu vực"
                    >
                      <MenuItem value="all">Tất cả</MenuItem>
                      <MenuItem value="Field 1">Field 1</MenuItem>
                      <MenuItem value="Field 2">Field 2</MenuItem>
                      <MenuItem value="Field 3">Field 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      fetchHarvests();
                      fetchStats();
                    }}
                    startIcon={<RefreshIcon />}
                  >
                    Làm mới
                  </Button>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleAddHarvest}
                    startIcon={<AddIcon />}
                    sx={{ backgroundColor: LEAF_GREEN }}
                  >
                    Thêm mới
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            {/* Harvest Table */}
            <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: LEAF_GREEN_LIGHT }}>
                      <TableCell sx={{ fontWeight: 600 }}>Khu vực</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Loại cây trồng</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Ngày thu hoạch</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Sản lượng (kg)</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Chất lượng</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Trạng thái</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredHarvests
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((harvest) => (
                        <TableRow key={harvest.id} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                              {harvest.fieldName}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <AgricultureIcon sx={{ mr: 1, color: 'text.secondary' }} />
                              {harvest.cropType}
                            </Box>
                          </TableCell>
                          <TableCell>{harvest.harvestDate}</TableCell>
                          <TableCell>{harvest.quantity ? harvest.quantity.toLocaleString() : '0'}</TableCell>
                          <TableCell>
                            <Chip
                              label={harvest.quality || 'Tốt'}
                              color={getQualityColor(harvest.quality)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={getStatusLabel(harvest.status)}
                              color={getStatusColor(harvest.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Tooltip title="Xem chi tiết">
                                <IconButton
                                  onClick={() => handleViewDetail(harvest)}
                                  color="primary"
                                  size="small"
                                >
                                  <VisibilityIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Chỉnh sửa">
                                <IconButton
                                  onClick={() => handleEditHarvest(harvest)}
                                  color="warning"
                                  size="small"
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Xóa">
                                <IconButton
                                  onClick={() => handleDeleteHarvest(harvest.id)}
                                  color="error"
                                  size="small"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredHarvests.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
                labelRowsPerPage="Số hàng mỗi trang:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
              />
            </Paper>
          </Box>
        </Fade>

        {/* Add/Edit Harvest Dialog */}
        <Dialog
          open={showAddDialog || showEditDialog}
          onClose={() => {
            setShowAddDialog(false);
            setShowEditDialog(false);
          }}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '16px',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
              p: 3,
              textAlign: 'center',
              borderBottom: '1px solid #e0e0e0'
            }}
          >
            <Avatar
              sx={{
                bgcolor: '#059669',
                width: 56,
                height: 56,
                mx: 'auto',
                mb: 1
              }}
            >
              <AgricultureIcon sx={{ fontSize: 30 }} />
            </Avatar>
            <DialogTitle sx={{ p: 0, color: '#059669', fontWeight: 600 }}>
              {showAddDialog ? 'Thêm thông tin thu hoạch mới' : 'Chỉnh sửa thông tin thu hoạch'}
            </DialogTitle>
          </Box>
          <DialogContent sx={{ p: 3 }}>
            <Grid container spacing={3} sx={{ mt: 0 }}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#64748B', fontWeight: 500 }}>Khu vực</InputLabel>
                  <Select
                    value={formData.fieldId}
                    onChange={(e) => setFormData({ ...formData, fieldId: e.target.value })}
                    label="Khu vực"
                    sx={{
                      borderRadius: '12px',
                      backgroundColor: '#f8fafc',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#e2e8f0',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#059669',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#059669',
                      }
                    }}
                  >
                    <MenuItem value="Field 1">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: '#10B981' }}>
                          <LocationIcon sx={{ fontSize: 14 }} />
                        </Avatar>
                        <Typography>Field 1</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="Field 2">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: '#10B981' }}>
                          <LocationIcon sx={{ fontSize: 14 }} />
                        </Avatar>
                        <Typography>Field 2</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="Field 3">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: '#10B981' }}>
                          <LocationIcon sx={{ fontSize: 14 }} />
                        </Avatar>
                        <Typography>Field 3</Typography>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#64748B', fontWeight: 500 }}>Loại cây trồng</InputLabel>
                  <Select
                    value={formData.cropType}
                    onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                    label="Loại cây trồng"
                    sx={{
                      borderRadius: '12px',
                      backgroundColor: '#f8fafc',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#e2e8f0',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#059669',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#059669',
                      }
                    }}
                  >
                    <MenuItem value="Lettuce">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: '#22C55E' }}>
                          <LocalFloristIcon sx={{ fontSize: 14 }} />
                        </Avatar>
                        <Typography>Xà lách (Lettuce)</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="Tomato">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: '#EF4444' }}>
                          <LocalFloristIcon sx={{ fontSize: 14 }} />
                        </Avatar>
                        <Typography>Cà chua (Tomato)</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="Rice">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: '#F59E0B' }}>
                          <GrassIcon sx={{ fontSize: 14 }} />
                        </Avatar>
                        <Typography>Lúa (Rice)</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="Corn">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: '#EAB308' }}>
                          <GrassIcon sx={{ fontSize: 14 }} />
                        </Avatar>
                        <Typography>Ngô (Corn)</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="Vegetable">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: '#16A34A' }}>
                          <LocalFloristIcon sx={{ fontSize: 14 }} />
                        </Avatar>
                        <Typography>Rau cải (Vegetable)</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="Soybean">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: '#84CC16' }}>
                          <LocalFloristIcon sx={{ fontSize: 14 }} />
                        </Avatar>
                        <Typography>Đậu tương (Soybean)</Typography>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ngày thu hoạch"
                  type="date"
                  value={formData.harvestDate}
                  onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: '#f8fafc',
                      '&:hover': {
                        backgroundColor: '#f1f5f9'
                      }
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Sản lượng (kg)"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="Ví dụ: 150"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: '#f8fafc',
                      '&:hover': {
                        backgroundColor: '#f1f5f9'
                      }
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#64748B', fontWeight: 500 }}>Chất lượng</InputLabel>
                  <Select
                    value={formData.quality}
                    onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                    label="Chất lượng"
                    sx={{
                      borderRadius: '12px',
                      backgroundColor: '#f8fafc',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#e2e8f0',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#059669',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#059669',
                      }
                    }}
                  >
                    <MenuItem value="Tốt">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: '#22C55E' }}>
                          <StarIcon sx={{ fontSize: 14 }} />
                        </Avatar>
                        <Typography>Tốt (Xuất sắc)</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="Khá">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: '#3B82F6' }}>
                          <StarHalfIcon sx={{ fontSize: 14 }} />
                        </Avatar>
                        <Typography>Khá (Tốt)</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="Trung bình">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: '#F59E0B' }}>
                          <StarBorderIcon sx={{ fontSize: 14 }} />
                        </Avatar>
                        <Typography>Trung bình</Typography>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Ghi chú"
                  multiline
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Thêm ghi chú về quá trình thu hoạch, điều kiện thời tiết, hoặc các lưu ý khác..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: '#f8fafc',
                      '&:hover': {
                        backgroundColor: '#f1f5f9'
                      }
                    }
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 2 }}>
            <Button 
              onClick={() => {
                setShowAddDialog(false);
                setShowEditDialog(false);
              }}
              variant="outlined"
              sx={{
                borderRadius: '12px',
                textTransform: 'none',
                px: 3,
                py: 1.5,
                borderColor: '#e0e0e0',
                color: '#666',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  borderColor: '#d0d0d0'
                }
              }}
            >
              Hủy bỏ
            </Button>
            <Button 
              onClick={handleSaveHarvest}
              variant="contained"
              sx={{
                borderRadius: '12px',
                textTransform: 'none',
                px: 4,
                py: 1.5,
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #047857 0%, #059669 100%)',
                  boxShadow: '0 6px 20px rgba(5, 150, 105, 0.4)'
                }
              }}
            >
              {showAddDialog ? 'Thêm thu hoạch' : 'Cập nhật thông tin'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Harvest Detail Dialog */}
        <Dialog
          open={showDetailDialog}
          onClose={() => setShowDetailDialog(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '16px',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
              p: 3,
              textAlign: 'center',
              borderBottom: '1px solid #e0e0e0'
            }}
          >
            <Avatar
              sx={{
                bgcolor: '#059669',
                width: 64,
                height: 64,
                mx: 'auto',
                mb: 2
              }}
            >
              <VisibilityIcon sx={{ fontSize: 36 }} />
            </Avatar>
            <DialogTitle sx={{ p: 0, color: '#059669', fontWeight: 600, fontSize: '1.5rem' }}>
              Chi tiết thông tin thu hoạch
            </DialogTitle>
          </Box>
          
          <DialogContent sx={{ p: 0 }}>
            {selectedHarvest && (
              <Box sx={{ p: 4 }}>
                {/* Header Card với thông tin cơ bản */}
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    mb: 3, 
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
                    border: '1px solid #BBF7D0'
                  }}
                >
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: '#10B981', width: 48, height: 48 }}>
                          <LocationIcon sx={{ fontSize: 24 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#059669' }}>
                            {selectedHarvest.fieldName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Khu vực canh tác
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: '#EF4444', width: 48, height: 48 }}>
                          <LocalFloristIcon sx={{ fontSize: 24 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#059669' }}>
                            {selectedHarvest.cropType}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Loại cây trồng
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Thông tin chi tiết */}
                <Grid container spacing={3}>
                  {/* Ngày thu hoạch */}
                  <Grid item xs={12} md={6}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 3, 
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #FEF3C7 0%, #FEF9C3 100%)',
                        border: '1px solid #FDE68A',
                        textAlign: 'center'
                      }}
                    >
                      <Avatar sx={{ bgcolor: '#F59E0B', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                        <CalendarIcon sx={{ fontSize: 28 }} />
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#92400E', mb: 1 }}>
                        {selectedHarvest.harvestDate}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ngày thu hoạch
                      </Typography>
                    </Paper>
                  </Grid>

                  {/* Sản lượng */}
                  <Grid item xs={12} md={6}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 3, 
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
                        border: '1px solid #93C5FD',
                        textAlign: 'center'
                      }}
                    >
                      <Avatar sx={{ bgcolor: '#3B82F6', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                        <ScaleIcon sx={{ fontSize: 28 }} />
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E40AF', mb: 1 }}>
                        {selectedHarvest.quantity ? selectedHarvest.quantity.toLocaleString() : '0'} kg
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Sản lượng thu hoạch
                      </Typography>
                    </Paper>
                  </Grid>

                  {/* Chất lượng */}
                  <Grid item xs={12} md={6}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 3, 
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)',
                        border: '1px solid #C4B5FD',
                        textAlign: 'center'
                      }}
                    >
                      <Avatar sx={{ bgcolor: '#8B5CF6', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                        <StarIcon sx={{ fontSize: 28 }} />
                      </Avatar>
                      <Box sx={{ mb: 1 }}>
                        <Chip
                          label={selectedHarvest.quality || 'Tốt'}
                          color={getQualityColor(selectedHarvest.quality)}
                          sx={{ 
                            fontWeight: 600, 
                            fontSize: '0.9rem',
                            px: 2,
                            borderRadius: '8px'
                          }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Chất lượng sản phẩm
                      </Typography>
                    </Paper>
                  </Grid>

                  {/* Trạng thái */}
                  <Grid item xs={12} md={6}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 3, 
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
                        border: '1px solid #FECACA',
                        textAlign: 'center'
                      }}
                    >
                      <Avatar sx={{ bgcolor: '#EF4444', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                        <AssessmentIcon sx={{ fontSize: 28 }} />
                      </Avatar>
                      <Box sx={{ mb: 1 }}>
                        <Chip
                          label={getStatusLabel(selectedHarvest.status)}
                          color={getStatusColor(selectedHarvest.status)}
                          sx={{ 
                            fontWeight: 600, 
                            fontSize: '0.9rem',
                            px: 2,
                            borderRadius: '8px'
                          }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Trạng thái hiện tại
                      </Typography>
                    </Paper>
                  </Grid>

                  {/* Ghi chú */}
                  <Grid item xs={12}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 3, 
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
                        border: '1px solid #E2E8F0'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar sx={{ bgcolor: '#64748B', width: 40, height: 40 }}>
                          <EditIcon sx={{ fontSize: 20 }} />
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#334155' }}>
                          Ghi chú
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#475569',
                          lineHeight: 1.6,
                          fontStyle: selectedHarvest.notes ? 'normal' : 'italic'
                        }}
                      >
                        {selectedHarvest.notes || 'Không có ghi chú nào được thêm cho đợt thu hoạch này.'}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          
          <DialogActions sx={{ p: 3, borderTop: '1px solid #e0e0e0' }}>
            <Button 
              onClick={() => setShowDetailDialog(false)}
              variant="contained"
              sx={{
                borderRadius: '12px',
                textTransform: 'none',
                px: 4,
                py: 1.5,
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #047857 0%, #059669 100%)',
                  boxShadow: '0 6px 20px rgba(5, 150, 105, 0.4)'
                }
              }}
            >
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

export default HarvestScreen; 