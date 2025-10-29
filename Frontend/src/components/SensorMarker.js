import React from 'react';
import { Box } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import SpaIcon from '@mui/icons-material/Spa';
import SensorsIcon from '@mui/icons-material/Sensors';

const typeToIcon = {
    Temperature: (
        <Box sx={{
            background: '#fff',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            border: '3px solid #f57c00',
            position: 'relative',
        }}>
            <ThermostatIcon sx={{ color: '#f57c00', fontSize: 18 }} />
        </Box>
    ),
    Humidity: (
        <Box sx={{
            background: '#fff',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            border: '3px solid #0288d1',
            position: 'relative',
        }}>
            <OpacityIcon sx={{ color: '#0288d1', fontSize: 18 }} />
        </Box>
    ),
    "Soil Moisture": (
        <Box sx={{
            background: '#fff',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            border: '3px solid #388e3c',
            position: 'relative',
        }}>
            <SpaIcon sx={{ color: '#388e3c', fontSize: 18 }} />
        </Box>
    ),
};

const SensorMarker = ({ sensor, onClick }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return '#4CAF50';
            case 'Warning': return '#FFB300';
            case 'Error': return '#E53935';
            default: return '#9E9E9E';
        }
    };

    return (
        <Box
            onClick={() => onClick && onClick(sensor)}
            sx={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                '&:hover': {
                    transform: 'translate(-50%, -50%) scale(1.1)',
                    transition: 'transform 0.2s ease-in-out',
                },
            }}
            title={`${sensor.sensorName} (${sensor.type}) - ${sensor.status}`}
        >
            {typeToIcon[sensor.type] || (
                <Box sx={{
                    background: '#fff',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    border: '3px solid #9E9E9E',
                    position: 'relative',
                }}>
                    <SensorsIcon sx={{ color: '#9E9E9E', fontSize: 18 }} />
                </Box>
            )}
            {/* Status indicator */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(sensor.status),
                    border: '2px solid white',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }}
            />
        </Box>
    );
};

export default SensorMarker; 