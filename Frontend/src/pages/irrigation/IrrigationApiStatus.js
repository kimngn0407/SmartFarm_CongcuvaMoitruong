import React, { useState, useEffect } from 'react';
import farmService from '../../services/farmService';
import './IrrigationApiStatus.css';

const IrrigationApiStatus = () => {
    const [apiStatus, setApiStatus] = useState('checking'); // checking, connected, error
    const [lastCheck, setLastCheck] = useState(null);

    useEffect(() => {
        checkApiStatus();
        // Check API status every 30 seconds
        const interval = setInterval(checkApiStatus, 30000);
        return () => clearInterval(interval);
    }, []);

    const checkApiStatus = async () => {
        try {
            await farmService.getFarms();
            setApiStatus('connected');
            setLastCheck(new Date());
        } catch (error) {
            console.warn('API connection failed:', error.message);
            setApiStatus('error');
            setLastCheck(new Date());
        }
    };

    const getStatusInfo = () => {
        switch (apiStatus) {
            case 'checking':
                return {
                    icon: '🔄',
                    text: 'Đang kiểm tra kết nối API...',
                    className: 'checking'
                };
            case 'connected':
                return {
                    icon: '✅',
                    text: 'Kết nối API thành công',
                    className: 'connected'
                };
            case 'error':
                return {
                    icon: '❌',
                    text: 'Không thể kết nối API (đang sử dụng dữ liệu mẫu)',
                    className: 'error'
                };
            default:
                return {
                    icon: '❓',
                    text: 'Trạng thái không xác định',
                    className: 'unknown'
                };
        }
    };

    const statusInfo = getStatusInfo();

    const formatLastCheck = (date) => {
        if (!date) return '';
        return `Kiểm tra lần cuối: ${date.toLocaleTimeString('vi-VN')}`;
    };

    return (
        <div className={`irrigation-api-status ${statusInfo.className}`}>
            <div className="status-content">
                <span className="status-icon">{statusInfo.icon}</span>
                <span className="status-text">{statusInfo.text}</span>
            </div>
            {lastCheck && (
                <div className="last-check">
                    {formatLastCheck(lastCheck)}
                </div>
            )}
            <button 
                className="refresh-btn" 
                onClick={checkApiStatus}
                title="Kiểm tra lại kết nối"
            >
                🔄
            </button>
        </div>
    );
};

export default IrrigationApiStatus;
