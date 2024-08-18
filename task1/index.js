const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;
const WINDOW_SIZE = 10;
let numberWindow = [];

app.use(cors());

const fetchNumber = async (type) => {
    try {
        const response = await axios.get(`http://localhost:3/numbers/${type}`, { timeout: 500 });
        if (Array.isArray(response.data.numbers)) {
            return response.data.numbers;
        }
        return [];
    } catch (error) {
        console.error(`Error fetching ${type} numbers:`, error.message);
        return [];
    }
};


const calculateAverage = (numbers) => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return (sum / numbers.length).toFixed(2);
};

app.get('/numbers/:id', async (req, res) => {
    const { id } = req.params;
    if (!['p', 'f', 'e', 'r'].includes(id)) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    const prevWindowState = [...numberWindow];
    const newNumbers = await fetchNumber(id);

    newNumbers.forEach(num => {
        if (!numberWindow.includes(num)) {
            if (numberWindow.length >= WINDOW_SIZE) {
                numberWindow.shift(); // Remove the oldest number
            }
            numberWindow.push(num);
        }
    });

    const avg = numberWindow.length > 0 ? calculateAverage(numberWindow) : 0;

    res.json({
        windowPrevState: prevWindowState,
        windowCurrState: numberWindow,
        numbers: newNumbers,
        avg: avg,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
