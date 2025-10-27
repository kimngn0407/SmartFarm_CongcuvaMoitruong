import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  Alert,
  AlertTitle
} from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import SyncIcon from '@mui/icons-material/Sync';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const FallbackModeInfo = ({ isInFallbackMode, storedData }) => {
  if (!isInFallbackMode) {
    return null;
  }

  return (
    <Paper sx={{ 
      p: 2, 
      mb: 2, 
      background: 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)',
      border: '1px solid #ffc107',
      borderRadius: 2
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <StorageIcon sx={{ color: '#856404', mr: 1 }} />
        <Typography variant="h6" sx={{ color: '#856404', fontWeight: 600 }}>
          Chế Độ Dự Phòng Đang Hoạt Động
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 2 }}>
        <AlertTitle>Thông tin quan trọng</AlertTitle>
        Hệ thống đang sử dụng chế độ dự phòng vì backend API chưa có các endpoint cập nhật.
        Dữ liệu của bạn vẫn được lưu trữ an toàn và sẽ được đồng bộ khi API sẵn sàng.
      </Alert>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, color: '#856404' }}>
            Tính năng hiện tại:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip
              icon={<CheckCircleIcon />}
              label="Xem thông tin profile"
              color="success"
              size="small"
            />
            <Chip
              icon={<StorageIcon />}
              label="Lưu thông tin cục bộ"
              color="warning"
              size="small"
            />
            <Chip
              icon={<SyncIcon />}
              label="Mô phỏng đổi mật khẩu"
              color="info"
              size="small"
            />
          </Box>
        </Box>

        {storedData && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, color: '#856404' }}>
              Dữ liệu đã lưu:
            </Typography>
            <Box sx={{ 
              p: 1.5, 
              bgcolor: 'rgba(255,255,255,0.7)', 
              borderRadius: 1,
              fontSize: '0.875rem'
            }}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Tên:</strong> {storedData.fullName}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Email:</strong> {storedData.email}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>SĐT:</strong> {storedData.phone}
              </Typography>
              <Typography variant="body2">
                <strong>Địa chỉ:</strong> {storedData.address}
              </Typography>
            </Box>
          </Box>
        )}

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, color: '#856404' }}>
            Lưu ý:
          </Typography>
          <Typography variant="body2" sx={{ color: '#856404', fontSize: '0.875rem' }}>
            • Dữ liệu được lưu trong trình duyệt của bạn
            • Thông tin sẽ được giữ lại khi refresh trang
            • Khi backend API sẵn sàng, dữ liệu sẽ được đồng bộ tự động
            • Bạn có thể tiếp tục sử dụng tất cả tính năng bình thường
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default FallbackModeInfo; 