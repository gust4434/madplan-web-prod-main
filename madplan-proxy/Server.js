// server.js

import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // Sørg for at have node-fetch installeret

const app = express();
const PORT = 3000;
const API_URL = 'https://lunch.tosi.dk/api/v1/latest.json';

app.use(cors());

app.get('/api/meals', async (req, res) => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP-fejl! Status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Fejl ved hentning af API-data:', error);
        res.status(500).json({ error: 'Fejl ved hentning af madplanen.' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server kører på http://localhost:${PORT}`);
});