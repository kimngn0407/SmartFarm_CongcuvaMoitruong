import React, { useState, useEffect } from 'react';
import harvestService from '../services/harvestService';

const HarvestRevenue = () => {
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        harvestService.getHarvestStatistics()
            .then(response => setStatistics(response.data))
            .catch(error => console.error('Error fetching statistics:', error));
    }, []);

    return (
        <div>
            <h1>Harvest & Revenue</h1>
            <ul>
                {statistics.map(stat => (
                    <li key={stat.id}>
                        {stat.year} - {stat.totalYield} kg - {stat.totalRevenue} USD
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HarvestRevenue;