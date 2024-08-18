const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3;

app.use(cors());

// Mock Data for each type of number set
const numberData = {
    p: [2, 3, 5, 7, 11],       // Prime numbers
    f: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55], // Fibonacci numbers
    e: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], // Even numbers
    r: [5, 12, 7, 19, 25, 9, 16, 24, 3, 11]  // Random numbers
};

app.get('/numbers/:type', (req, res) => {
    const { type } = req.params;

    if (!numberData[type]) {
        return res.status(400).json({ error: 'Invalid type' });
    }

    res.json({
        numbers: numberData[type]
    });
});

app.listen(PORT, () => {
    console.log(`Mock Third-Party Server running on http://localhost:${PORT}`);
});
