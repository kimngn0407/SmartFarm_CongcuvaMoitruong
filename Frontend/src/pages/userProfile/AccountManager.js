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
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Snackbar,
  Fade,
  Avatar,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import accountService from '../../services/accountService';
import RoleGuard from '../../components/Auth/RoleGuard';

const ROLES = ['ADMIN', 'FARMER', 'TECHNICIAN', 'FARM_OWNER'];
const LEAF_GREEN = '#81c784';
const LEAF_GREEN_LIGHT = '#a5d6a7';

const AccountManager = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [editedRoles, setEditedRoles] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', color: 'success' });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = await accountService.getAllAccounts();
      setAccounts(res.data);
    } catch (error) {
      setSnackbar({ open: true, message: 'Lỗi khi tải danh sách tài khoản', color: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (id, newRole) => {
    setEditedRoles(prev => ({
      ...prev,
      [id]: newRole
    }));
  };

  const handleSaveRole = async (id, currentRole) => {
    const role = editedRoles[id] || currentRole;
    setSavingId(id);
    try {
      await accountService.updateAccountRole(id, role);
      setAccounts(accounts.map(acc =>
        acc.id === id ? { ...acc, role } : acc
      ));
      setEditedRoles(prev => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
      setSnackbar({ open: true, message: 'Cập nhật quyền thành công!', color: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Lỗi khi cập nhật quyền', color: 'error' });
    } finally {
      setSavingId(null);
    }
  };

  return (
    <RoleGuard allowedRoles={['ADMIN']}>
      <Box
        sx={{
          p: { xs: 1, md: 4 },
          background: 'linear-gradient(135deg, #e0f2f1 0%, #f5f5f5 100%)',
          minHeight: '100vh',
          width: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 0,
          overflow: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Fade in timeout={600}>
          <Paper
            elevation={4}
            sx={{
              width: { xs: '98vw', md: '90vw', lg: '70vw' },
              maxWidth: 1200,
              height: 'auto',
              maxHeight: '90vh',
              mx: 'auto',
              my: 4,
              p: { xs: 1, md: 4 },
              borderRadius: 4,
              boxShadow: '0 8px 32px 0 rgba(67, 160, 71, 0.10)',
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={3}
              color="#000"
              sx={{
                textAlign: 'center',
                letterSpacing: 1,
                textShadow: '0 2px 8px #81c78433'
              }}
            >
              Quản lý tài khoản
            </Typography>
            <TableContainer sx={{ flex: 1, overflow: 'auto' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ background: LEAF_GREEN_LIGHT }}>
                    <TableCell sx={{ fontWeight: 700, color: '#000', fontSize: 16 }}>Avatar</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#000', fontSize: 16 }}>Họ tên</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#000', fontSize: 16 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#000', fontSize: 16 }}>Quyền</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#000', fontSize: 16 }}>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <CircularProgress color="success" size={32} />
                      </TableCell>
                    </TableRow>
                  ) : accounts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        Không có tài khoản nào.
                      </TableCell>
                    </TableRow>
                  ) : (
                    accounts.map(acc => (
                      <TableRow
                        key={acc.id}
                        sx={{
                          '&:hover': { background: '#c8e6c9' },
                          transition: 'background 0.2s'
                        }}
                      >
                        <TableCell>
                          <Avatar sx={{
                            bgcolor: LEAF_GREEN,
                            color: '#fff',
                            width: 40,
                            height: 40,
                            fontWeight: 700,
                            fontSize: 20,
                            boxShadow: '0 2px 8px #81c78455'
                          }}>
                            {acc.fullName ? acc.fullName.charAt(0).toUpperCase() : <PersonIcon />}
                          </Avatar>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 500, fontSize: 15, color: '#000' }}>
                          {acc.fullName || acc.username || '---'}
                        </TableCell>
                        <TableCell sx={{ fontSize: 15, color: '#000' }}>{acc.email}</TableCell>
                        <TableCell>
                          <Select
                            value={editedRoles[acc.id] || acc.role}
                            onChange={e => handleRoleChange(acc.id, e.target.value)}
                            size="small"
                            sx={{
                              minWidth: 120,
                              background: '#e8f5e8',
                              borderRadius: 2,
                              fontWeight: 600,
                              color: '#000'
                            }}
                          >
                            {ROLES.map(role => (
                              <MenuItem key={role} value={role}>
                                {role}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleSaveRole(acc.id, acc.role)}
                            disabled={savingId === acc.id}
                            sx={{
                              background: 'linear-gradient(90deg, #81c784 0%, #a5d6a7 100%)',
                              color: '#000',
                              fontWeight: 700,
                              borderRadius: 3,
                              px: 3,
                              textTransform: 'none',
                              boxShadow: '0 2px 8px 0 rgba(129, 199, 132, 0.10)',
                              '&:hover': {
                                background: 'linear-gradient(90deg, #66bb6a 0%, #81c784 100%)',
                              },
                            }}
                          >
                            {savingId === acc.id ? <CircularProgress size={18} color="inherit" /> : 'Lưu'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Snackbar
              open={snackbar.open}
              autoHideDuration={2500}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              message={snackbar.message}
              anchorOrigin={{ vertical: 'middle', horizontal: 'center' }}
              ContentProps={{
                sx: {
                  background: snackbar.color === 'success' ? LEAF_GREEN : '#d32f2f',
                  color: '#000',
                  fontWeight: 900,
                  fontSize: 32,
                  borderRadius: 3,
                  minWidth: 500,
                  minHeight: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  boxShadow: '0 4px 32px 0 rgba(129, 199, 132, 0.20)'
                }
              }}
            />
          </Paper>
        </Fade>
      </Box>
    </RoleGuard>
  );
};

export default AccountManager;