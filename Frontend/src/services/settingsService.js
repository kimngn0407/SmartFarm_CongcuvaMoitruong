import axios from 'axios';

const saveSettings = (data) => axios.post('/api/settings', data);

export default {
    saveSettings,
};