import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ Get all harvests
const getAllHarvests = () => axios.get(`${API_BASE_URL}/api/harvests`, { headers: getAuthHeader() });

// ✅ Get harvests by field ID
const getHarvestsByField = (fieldId) => axios.get(`${API_BASE_URL}/api/harvests/field/${fieldId}`, { headers: getAuthHeader() });

// ✅ Get harvest by ID
const getHarvestById = (id) => axios.get(`${API_BASE_URL}/api/harvests/${id}`, { headers: getAuthHeader() });

// ✅ Create new harvest
const createHarvest = (data) => axios.post(`${API_BASE_URL}/api/harvests`, data, { headers: getAuthHeader() });

// ✅ Update harvest
const updateHarvest = (id, data) => axios.put(`${API_BASE_URL}/api/harvests/${id}`, data, { headers: getAuthHeader() });

// ✅ Delete harvest
const deleteHarvest = (id) => axios.delete(`${API_BASE_URL}/api/harvests/${id}`, { headers: getAuthHeader() });

// ✅ Get harvest statistics
const getHarvestStats = () => axios.get(`${API_BASE_URL}/api/harvests/stats`, { headers: getAuthHeader() });

// ✅ Get harvest statistics (legacy method for backward compatibility)
const getHarvestStatistics = () => axios.get(`${API_BASE_URL}/api/harvests/summary`, { headers: getAuthHeader() });

export default {
    getAllHarvests,
    getHarvestsByField,
    getHarvestById,
    createHarvest,
    updateHarvest,
    deleteHarvest,
    getHarvestStats,
    getHarvestStatistics,
};