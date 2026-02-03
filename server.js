const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// Middleware for parsing JSON
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname)));

// Route mappings for clean URLs
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/features', (req, res) => {
    res.sendFile(path.join(__dirname, 'features.html'));
});

app.get('/store', (req, res) => {
    res.sendFile(path.join(__dirname, 'store.html'));
});

app.get('/status', (req, res) => {
    res.sendFile(path.join(__dirname, 'status.html'));
});

app.get('/social', (req, res) => {
    res.sendFile(path.join(__dirname, 'social.html'));
});

// Catch all handler for any other requests
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});