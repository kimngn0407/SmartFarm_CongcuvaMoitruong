import React from 'react';

function UnderDevelopmentPage() {
  return (
    <div style={{
      textAlign: 'center',
      marginTop: '50px',
      padding: '40px',
      backgroundColor: '#fff3e0',
      border: '2px dashed #ff9800',
      borderRadius: '10px',
      maxWidth: '1000px',
      margin: '50px auto',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{ color: '#f57c00', marginBottom: '20px' }}>Hệ Thống Đang trong quá trình phát triển.</h1>
      <p style={{ color: '#333', fontSize: '1.1em' }}>Vui lòng truy cập sau.</p>
    </div>
  );
}

export default UnderDevelopmentPage; 