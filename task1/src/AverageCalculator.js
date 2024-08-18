import React, { useState } from 'react';
import axios from 'axios';

const AverageCalculator = () => {
    const [numberId, setNumberId] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');

    const handleFetchNumbers = async () => {
        if (!['p', 'f', 'e', 'r'].includes(numberId)) {
            setError('Invalid ID. Use p, f, e, or r.');
            return;
        }

        try {
            const res = await axios.get(`http://localhost:3001/numbers/${numberId}`);
            setResponse(res.data);
            setError('');
        } catch (err) {
            setError('Error fetching data. Please try again.');
        }
    };

    return (
        <div>
            <h1>Average Calculator</h1>
            <input
                type="text"
                value={numberId}
                onChange={(e) => setNumberId(e.target.value)}
                placeholder="Enter ID (p, f, e, r)"
            />
            <button onClick={handleFetchNumbers}>Fetch Numbers</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <h2>Result</h2>
                    <p><strong>Previous Window State:</strong> {JSON.stringify(response.windowPrevState)}</p>
                    <p><strong>Current Window State:</strong> {JSON.stringify(response.windowCurrState)}</p>
                    <p><strong>Fetched Numbers:</strong> {JSON.stringify(response.numbers)}</p>
                    <p><strong>Average:</strong> {response.avg}</p>
                </div>
            )}
        </div>
    );
};

export default AverageCalculator;
