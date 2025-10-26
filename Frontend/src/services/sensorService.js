import axios from 'axios';
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};
const transformSensorDataForCharts = (data) => {
    return data.map(item => ({
        fieldId: item.fieldId,
        temperature: Number(item.temperature),
        humidity: Number(item.humidity)
    }));
};

// Quản lý Sensor
const getSensorsByField = (fieldId) => axios.get(`/api/sensors?fieldId=${fieldId}`, { headers: getAuthHeader() });
const getSensorById = (id) => axios.get(`/api/sensors/${id}`, { headers: getAuthHeader() });
const createSensor = (data) => axios.post('/api/sensors', data, { headers: getAuthHeader() });
const updateSensor = (id, data) => axios.put(`/api/sensors/${id}`, data, { headers: getAuthHeader() });
const deleteSensor = (id) => axios.delete(`/api/sensors/${id}`, { headers: getAuthHeader() });

// Quản lý Sensor Data
const postSensorData = (data) => axios.post('/api/sensor-data', data, { headers: getAuthHeader() });

const getSensorDataByFieldAndType = (fieldId, type, date) =>
    axios.get('/api/sensor-data', { params: { fieldId, type, date }, headers: getAuthHeader() });

const getLatestSensorDataByField = (fieldId) =>
    axios.get('/api/sensor-data/latest', { params: { fieldId }, headers: getAuthHeader() });

const getSensorDataByField = async (fieldId) => {
    try {
        const response = await axios.get('/api/sensor-data', { params: { fieldId }, headers: getAuthHeader() });
        return transformSensorDataForCharts(response.data);
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        return [];
    }
};

const getAllSensorDataForDashboard = async () => {
    try {
        const response = await axios.get('/api/sensor-data', { headers: getAuthHeader() });
        return transformSensorDataForCharts(response.data);
    } catch (error) {
        console.error('Error fetching all sensor data:', error);
        return [];
    }
};

const getSensorList = async () => {
    try {
        const response = await axios.get('/api/sensors', { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        console.error('Error fetching sensor list:', error);
        return [];
    }
};

export default {
    // Sensor APIs
    getSensorsByField,
    getSensorById,
    createSensor,
    updateSensor,
    deleteSensor,

    // Sensor Data APIs
    postSensorData,
    getSensorDataByFieldAndType,
    getLatestSensorDataByField,

    // Các hàm helper cũ (xóa nếu không dùng)
    getSensorDataByField, 
    getAllSensorDataForDashboard,
    getSensorList
};