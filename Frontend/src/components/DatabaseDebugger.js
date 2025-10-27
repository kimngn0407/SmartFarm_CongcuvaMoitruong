import React, { useState, useEffect } from 'react';
import irrigationService from '../services/irrigationService';

const DatabaseDebugger = () => {
    const [debugData, setDebugData] = useState({
        irrigationHistory: [],
        fertilizationHistory: [],
        fields: [],
        farms: [],
        loading: false,
        error: null
    });

    const loadRawData = async () => {
        setDebugData(prev => ({ ...prev, loading: true, error: null }));
        
        try {
            console.log('🔍 Loading raw database data...');
            
            // Load all data directly from endpoints
            const [irrigationRes, fieldsRes, farmsRes] = await Promise.all([
                irrigationService.getIrrigationHistoryAll().catch(err => ({ data: [], error: err.message })),
                irrigationService.getFarms().catch(err => ({ data: [], error: err.message })),
                irrigationService.getFarms().catch(err => ({ data: [], error: err.message }))
            ]);

            const fertRes = await irrigationService.getFertilizationHistoryAll()
                .catch(err => ({ data: [], error: err.message }));

            setDebugData({
                irrigationHistory: irrigationRes.data || [],
                fertilizationHistory: fertRes.data || [],
                fields: fieldsRes.data || [],
                farms: farmsRes.data || [],
                loading: false,
                error: null
            });

            console.log('📊 Raw database data loaded:');
            console.log('Irrigation history:', irrigationRes.data);
            console.log('Fertilization history:', fertRes.data);
            console.log('Fields:', fieldsRes.data);
            console.log('Farms:', farmsRes.data);
            
        } catch (error) {
            console.error('❌ Error loading raw data:', error);
            setDebugData(prev => ({ 
                ...prev, 
                loading: false, 
                error: error.message 
            }));
        }
    };

    useEffect(() => {
        loadRawData();
    }, []);

    if (debugData.loading) return <div>Loading database data...</div>;

    return (
        <div style={{ 
            background: '#fff', 
            border: '2px solid #007bff', 
            padding: '15px', 
            margin: '20px 0', 
            borderRadius: '8px',
            maxHeight: '400px',
            overflow: 'auto'
        }}>
            <h3>🔍 Raw Database Data Debug</h3>
            
            <button 
                onClick={loadRawData}
                style={{
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginBottom: '10px'
                }}
            >
                Refresh Raw Data
            </button>

            {debugData.error && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                    Error: {debugData.error}
                </div>
            )}

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <h4>Irrigation History ({debugData.irrigationHistory.length} records)</h4>
                    <pre style={{ 
                        background: '#f8f9fa', 
                        padding: '10px', 
                        borderRadius: '4px',
                        fontSize: '12px',
                        maxHeight: '200px',
                        overflow: 'auto'
                    }}>
                        {JSON.stringify(debugData.irrigationHistory, null, 2)}
                    </pre>
                </div>

                <div style={{ flex: '1', minWidth: '300px' }}>
                    <h4>Fertilization History ({debugData.fertilizationHistory.length} records)</h4>
                    <pre style={{ 
                        background: '#f8f9fa', 
                        padding: '10px', 
                        borderRadius: '4px',
                        fontSize: '12px',
                        maxHeight: '200px',
                        overflow: 'auto'
                    }}>
                        {JSON.stringify(debugData.fertilizationHistory, null, 2)}
                    </pre>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div style={{ flex: '1' }}>
                    <h4>Fields ({debugData.fields.length})</h4>
                    <pre style={{ 
                        background: '#f8f9fa', 
                        padding: '10px', 
                        borderRadius: '4px',
                        fontSize: '12px',
                        maxHeight: '150px',
                        overflow: 'auto'
                    }}>
                        {JSON.stringify(debugData.fields, null, 2)}
                    </pre>
                </div>

                <div style={{ flex: '1' }}>
                    <h4>Farms ({debugData.farms.length})</h4>
                    <pre style={{ 
                        background: '#f8f9fa', 
                        padding: '10px', 
                        borderRadius: '4px',
                        fontSize: '12px',
                        maxHeight: '150px',
                        overflow: 'auto'
                    }}>
                        {JSON.stringify(debugData.farms, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default DatabaseDebugger;
