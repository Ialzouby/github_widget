const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// API to serve the contributions.json file
app.get('/api/contributions', (req, res) => {
    try {
        const contributions = fs.readFileSync(path.join(__dirname, 'public', 'contributions.json'));
        res.json(JSON.parse(contributions));
    } catch (err) {
        res.status(500).json({ error: 'Error reading contributions file.' });
    }
});

// Fallback to index.html for unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
