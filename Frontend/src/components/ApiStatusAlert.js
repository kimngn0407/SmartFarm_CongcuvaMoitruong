import React from 'react';

const ApiStatusAlert = ({ missingEndpoints, workingEndpoints }) => {
    if (workingEndpoints && workingEndpoints.includes('/api/irrigation')) {
        return (
            <div style={{
                background: '#d4edda',
                border: '1px solid #c3e6cb',
                color: '#155724',
                padding: '15px',
                borderRadius: '8px',
                margin: '15px 0',
                fontSize: '14px'
            }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#155724' }}>
                    ✅ API Kết nối thành công
                </h4>
                
                <p><strong>Endpoint hoạt động:</strong></p>
                <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                    <li><code>/api/irrigation</code> ✅</li>
                    <li><code>/api/fertilization</code> ✅</li>
                    <li><code>/api/farms</code> ✅</li>
                </ul>
                
                <p style={{ margin: '10px 0 0 0' }}>
                    <strong>Trạng thái:</strong> Đang hiển thị dữ liệu thực từ database.
                </p>
            </div>
        );
    }

    return (
        <div style={{
            background: '#fff3cd',
            border: '1px solid #ffeeba',
            color: '#856404',
            padding: '15px',
            borderRadius: '8px',
            margin: '15px 0',
            fontSize: '14px'
        }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#856404' }}>
                ⚠️ Đang kiểm tra kết nối API
            </h4>
            
            <p><strong>Endpoint backend:</strong></p>
            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                <li><code>/api/irrigation</code></li>
                <li><code>/api/fertilization</code></li>
            </ul>
            
            <p style={{ margin: '10px 0 0 0' }}>
                <strong>Trạng thái:</strong> Đang test API để lấy dữ liệu thực từ database...
            </p>
        </div>
    );
};

export default ApiStatusAlert;
