import React, { useState } from 'react';
import axios from 'axios';

const SystemSettings = () => {
    const [autoIrrigation, setAutoIrrigation] = useState(false);

    const handleSave = () => {
        axios.post('/api/settings', { autoIrrigation })
            .then(() => alert('Cài đặt đã được lưu!'))
            .catch(error => console.error('Error saving settings:', error));
    };

    return (
        <div>
            <h1>System Settings</h1>
            <label>
                <input
                    type="checkbox"
                    checked={autoIrrigation}
                    onChange={(e) => setAutoIrrigation(e.target.checked)}
                />
                Bật/Tắt tự động phun sương, tưới nước
            </label>
            <button onClick={handleSave}>Lưu cài đặt</button>
        </div>
    );
};

export default SystemSettings;