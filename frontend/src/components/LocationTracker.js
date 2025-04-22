import React, { useState } from 'react';
import axios from 'axios';

const LocationTracker = () => {
    const [location, setLocation] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/api/location', { location, alertMessage });
        console.log(response.data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
            <input type="text" placeholder="Alert Message" onChange={(e) => setAlertMessage(e.target.value)} />
            <button type="submit">Set Location Alert</button>
        </form>
    );
};

export default LocationTracker;