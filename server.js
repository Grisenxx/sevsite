const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// Middleware for parsing JSON
app.use(express.json());

// API Proxy to bypass CORS
app.use('/api', async (req, res) => {
    const apiUrl = `https://api.nexyn.net${req.path}`;
    
    console.log('Proxying request:', {
        method: req.method,
        url: apiUrl,
        headers: req.headers.authorization,
        body: req.body
    });
    
    try {
        const response = await fetch(apiUrl, {
            method: req.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization || ''
            },
            body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
        });
        
        const data = await response.json();
        console.log('API Response:', response.status, data);
        res.status(response.status).json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: error.message });
    }
});

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Clean URLs enabled:');
    console.log('  http://localhost:8080/ (Home)');
    console.log('  http://localhost:8080/features');
    console.log('  http://localhost:8080/store');
    console.log('  http://localhost:8080/status');
    console.log('  http://localhost:8080/social');
});