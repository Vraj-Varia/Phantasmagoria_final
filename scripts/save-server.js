const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.SAVE_PORT || 3001;
const PUBLIC_SETTINGS_PATH = path.join(__dirname, '..', 'public', 'site_settings.json');
const BUILD_SETTINGS_PATH = path.join(__dirname, '..', 'build', 'site_settings.json');

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/api/save-settings' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        if (!parsed || typeof parsed !== 'object') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload' }));
          return;
        }

        const jsonString = JSON.stringify(parsed, null, 2);
        fs.writeFileSync(PUBLIC_SETTINGS_PATH, jsonString, 'utf-8');

        if (fs.existsSync(path.dirname(BUILD_SETTINGS_PATH))) {
          fs.writeFileSync(BUILD_SETTINGS_PATH, jsonString, 'utf-8');
        }

        console.log(`[${new Date().toLocaleTimeString()}] ✅ Successfully saved site_settings.json directly to disk!`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          mode: 'server',
          message: 'Successfully saved directly to public/site_settings.json on disk!'
        }));
      } catch (err) {
        console.error('Error saving settings to disk:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  if (url.pathname === '/api/get-settings' && req.method === 'GET') {
    try {
      if (fs.existsSync(PUBLIC_SETTINGS_PATH)) {
        const data = fs.readFileSync(PUBLIC_SETTINGS_PATH, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
        return;
      }
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'site_settings.json not found' }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 [Phantasmagoria Save Server] Running on http://localhost:${PORT}/api/save-settings`);
});
