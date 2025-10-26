import React, { useState, useEffect } from 'react';
import { 
    Box, 
    TextField, 
    Button, 
    Grid, 
    MenuItem, 
    DialogActions,
    Avatar,
    Typography 
} from '@mui/material';
import {
    Thermostat as TemperatureIcon,
    Opacity as HumidityIcon,
    Grass as SoilMoistureIcon,
    CheckCircle as ActiveIcon,
    Warning as WarningIcon,
    Error as ErrorIcon,
} from '@mui/icons-material';

const SensorForm = ({ sensor, onSubmit, onCancel, fields = [], sensors = [] }) => {
    const [formData, setFormData] = useState({
        sensorName: '',
        type: '',
        status: 'Active',
        lat: '',
        lng: '',
        fieldId: '',
        installationDate: new Date().toISOString().split('T')[0],
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (sensor) {
            setFormData({
                ...sensor,
                installationDate: new Date(sensor.installationDate).toISOString().split('T')[0],
            });
        }
    }, [sensor]);

    const validateForm = () => {
        const newErrors = {};
        
        // 🔍 Validate Sensor Name
        if (!formData.sensorName.trim()) {
            newErrors.sensorName = 'Tên sensor không được để trống';
        } else if (formData.sensorName.trim().length < 3) {
            newErrors.sensorName = 'Tên sensor phải có ít nhất 3 ký tự';
        } else {
            // Check duplicate name in same field
            const duplicate = sensors.some(s =>
                s.sensorName.trim().toLowerCase() === formData.sensorName.trim().toLowerCase() &&
                s.fieldId === formData.fieldId &&
                (!sensor || s.id !== sensor.id)
            );
            if (duplicate) {
                newErrors.sensorName = 'Tên sensor đã tồn tại trong field này';
            }
        }
        
        // 🔍 Validate Sensor Type
        if (!formData.type) {
            newErrors.type = 'Vui lòng chọn loại sensor';
        }
        
        // 🔍 Validate Status
        if (!formData.status) {
            newErrors.status = 'Vui lòng chọn trạng thái';
        }
        
        // 🔍 Validate Field
        if (!formData.fieldId) {
            newErrors.fieldId = 'Vui lòng chọn field';
        }
        
        // 🔍 Validate Latitude
        if (!formData.lat) {
            newErrors.lat = 'Latitude không được để trống';
        } else {
            const lat = parseFloat(formData.lat);
            if (isNaN(lat)) {
                newErrors.lat = 'Latitude phải là số';
            } else if (lat < -90 || lat > 90) {
                newErrors.lat = 'Latitude phải trong khoảng -90 đến 90';
            }
        }
        
        // 🔍 Validate Longitude
        if (!formData.lng) {
            newErrors.lng = 'Longitude không được để trống';
        } else {
            const lng = parseFloat(formData.lng);
            if (isNaN(lng)) {
                newErrors.lng = 'Longitude phải là số';
            } else if (lng < -180 || lng > 180) {
                newErrors.lng = 'Longitude phải trong khoảng -180 đến 180';
            }
        }
        
        // 🔍 Validate Installation Date
        if (!formData.installationDate) {
            newErrors.installationDate = 'Vui lòng chọn ngày lắp đặt';
        } else {
            const installDate = new Date(formData.installationDate);
            const currentDate = new Date();
            if (installDate > currentDate) {
                newErrors.installationDate = 'Ngày lắp đặt không được là ngày tương lai';
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('🔍 Form submission started');
        console.log('📝 Current form data:', formData);
        
        if (validateForm()) {
            console.log('✅ Validation passed, submitting data:', formData);
            onSubmit(formData);
        } else {
            console.log('❌ Validation failed:', errors);
            alert('Vui lòng kiểm tra lại thông tin đã nhập!');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Tên Sensor"
                        name="sensorName"
                        value={formData.sensorName}
                        onChange={handleChange}
                        error={!!errors.sensorName}
                        helperText={errors.sensorName}
                        required
                        placeholder="Ví dụ: Sensor_Nhiệt_Độ_Field1"
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
                    <TextField
                        fullWidth
                        select
                        label="Loại Sensor"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        error={!!errors.type}
                        helperText={errors.type}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                backgroundColor: '#f8fafc',
                                '&:hover': {
                                    backgroundColor: '#f1f5f9'
                                }
                            }
                        }}
                    >
                        <MenuItem value="Temperature">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 24, height: 24, bgcolor: '#FF6B35' }}>
                                    <TemperatureIcon sx={{ fontSize: 14 }} />
                                </Avatar>
                                <Typography>Nhiệt độ (Temperature)</Typography>
                            </Box>
                        </MenuItem>
                        <MenuItem value="Humidity">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 24, height: 24, bgcolor: '#4FC3F7' }}>
                                    <HumidityIcon sx={{ fontSize: 14 }} />
                                </Avatar>
                                <Typography>Độ ẩm (Humidity)</Typography>
                            </Box>
                        </MenuItem>
                        <MenuItem value="Soil Moisture">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 24, height: 24, bgcolor: '#66BB6A' }}>
                                    <SoilMoistureIcon sx={{ fontSize: 14 }} />
                                </Avatar>
                                <Typography>Độ ẩm đất (Soil Moisture)</Typography>
                            </Box>
                        </MenuItem>
                    </TextField>
                </Grid>
                
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        select
                        label="Trạng thái"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        error={!!errors.status}
                        helperText={errors.status}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                backgroundColor: '#f8fafc',
                                '&:hover': {
                                    backgroundColor: '#f1f5f9'
                                }
                            }
                        }}
                    >
                        <MenuItem value="Active">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 24, height: 24, bgcolor: '#4CAF50' }}>
                                    <ActiveIcon sx={{ fontSize: 14 }} />
                                </Avatar>
                                <Typography>Hoạt động (Active)</Typography>
                            </Box>
                        </MenuItem>
                        <MenuItem value="Warning">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 24, height: 24, bgcolor: '#FF9800' }}>
                                    <WarningIcon sx={{ fontSize: 14 }} />
                                </Avatar>
                                <Typography>Bảo trì (Under_Maintenance)</Typography>
                            </Box>
                        </MenuItem>
                        <MenuItem value="Error">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 24, height: 24, bgcolor: '#F44336' }}>
                                    <ErrorIcon sx={{ fontSize: 14 }} />
                                </Avatar>
                                <Typography>Không hoạt động (Inactive)</Typography>
                            </Box>
                        </MenuItem>
                    </TextField>
                </Grid>
                
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        select
                        label="Chọn Field"
                        name="fieldId"
                        value={formData.fieldId}
                        onChange={handleChange}
                        error={!!errors.fieldId}
                        helperText={errors.fieldId}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                backgroundColor: '#f8fafc',
                                '&:hover': {
                                    backgroundColor: '#f1f5f9'
                                }
                            }
                        }}
                    >
                        {fields.map(field => (
                            <MenuItem key={field.id} value={field.id}>
                                {field.fieldName || field.name} 
                                {field.area && ` (${field.area})`}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Vĩ độ (Latitude)"
                        name="lat"
                        type="number"
                        value={formData.lat}
                        onChange={handleChange}
                        error={!!errors.lat}
                        helperText={errors.lat || "Ví dụ: 10.8231"}
                        required
                        placeholder="10.8231"
                        inputProps={{ step: "0.0001", min: -90, max: 90 }}
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
                
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Kinh độ (Longitude)"
                        name="lng"
                        type="number"
                        value={formData.lng}
                        onChange={handleChange}
                        error={!!errors.lng}
                        helperText={errors.lng || "Ví dụ: 106.6297"}
                        required
                        placeholder="106.6297"
                        inputProps={{ step: "0.0001", min: -180, max: 180 }}
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
                    <TextField
                        fullWidth
                        label="Ngày lắp đặt"
                        name="installationDate"
                        type="date"
                        value={formData.installationDate}
                        onChange={handleChange}
                        error={!!errors.installationDate}
                        helperText={errors.installationDate || "Chọn ngày lắp đặt sensor"}
                        required
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
            </Grid>
            
            <DialogActions sx={{ mt: 3, px: 0, gap: 2 }}>
                <Button 
                    onClick={onCancel}
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
                    type="submit" 
                    variant="contained"
                    sx={{
                        borderRadius: '12px',
                        textTransform: 'none',
                        px: 4,
                        py: 1.5,
                        background: 'linear-gradient(135deg, #0277BD 0%, #01579B 100%)',
                        boxShadow: '0 4px 15px rgba(2, 119, 189, 0.3)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #01579B 0%, #0277BD 100%)',
                            boxShadow: '0 6px 20px rgba(2, 119, 189, 0.4)'
                        }
                    }}
                >
                    {sensor ? 'Cập nhật Sensor' : 'Thêm Sensor'}
                </Button>
            </DialogActions>
        </Box>
    );
};

export default SensorForm;