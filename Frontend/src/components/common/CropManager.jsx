import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    TextField,
    InputAdornment,
    CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import cropService from '../../services/cropService';

const plantId = 1;

const CropManager = () => {
    const [crops, setCrops] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        cropService.getFlatStagesByPlantId(plantId)
            .then(res => setCrops(res.data))
            .catch(() => setCrops([]))
            .finally(() => setLoading(false));
    }, []);

    const handleSearch = (e) => setSearchTerm(e.target.value);

    const filteredCrops = crops.filter(crop =>
        (crop.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (crop.seasonName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (crop.stageName || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ p: 4, maxWidth: '100%', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}>
                🌱 Quản lý giai đoạn cây trồng
            </Typography>

            <Box sx={{ mb: 3, maxWidth: 400 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="🔍 Tìm kiếm tên cây, vụ, giai đoạn..."
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{ backgroundColor: '#fff', borderRadius: 2 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="primary" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Paper elevation={4} sx={{ borderRadius: 4 }}>
                <TableContainer sx={{ borderRadius: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#e8f4fd' }}>
                                {['Tên cây', 'Mùa vụ', 'Giai đoạn', 'Ngày tối thiểu', 'Ngày tối đa', 'Mô tả'].map((label) => (
                                    <TableCell key={label} sx={{ fontWeight: 'bold', color: '#0d47a1' }}>{label}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                        <CircularProgress size={30} />
                                    </TableCell>
                                </TableRow>
                            ) : filteredCrops.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 3, fontStyle: 'italic', color: 'gray' }}>
                                        Không có dữ liệu phù hợp.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCrops
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((crop) => (
                                        <TableRow
                                            key={crop.id}
                                            hover
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: '#f0f8ff'
                                                }
                                            }}
                                        >
                                            <TableCell>{crop.name}</TableCell>
                                            <TableCell>{crop.seasonName}</TableCell>
                                            <TableCell>{crop.stageName}</TableCell>
                                            <TableCell>{crop.minDay}</TableCell>
                                            <TableCell>{crop.maxDay}</TableCell>
                                            <TableCell>{crop.description}</TableCell>
                                        </TableRow>
                                    ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredCrops.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                    labelRowsPerPage="Số hàng mỗi trang:"
                    sx={{ px: 2 }}
                />
            </Paper>
        </Box>
    );
};

export default CropManager;
