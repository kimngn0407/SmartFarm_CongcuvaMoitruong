import axios from 'axios';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const getFarms = () => axios.get('/api/farms', { headers: getAuthHeader() });
const getFarmById = (id) => axios.get(`/api/farms/${id}`, { headers: getAuthHeader() });
const createFarm = (data) => axios.post('/api/farms', data, { headers: getAuthHeader() });
const updateFarm = (id, data) => axios.put(`/api/farms/${id}`, data, { headers: getAuthHeader() });
const deleteFarm = (id) => axios.delete(`/api/farms/${id}`, { headers: getAuthHeader() });

export default {
    getFarms,
    getFarmById,
    createFarm,
    updateFarm,
    deleteFarm,
};