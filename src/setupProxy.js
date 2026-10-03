const fs = require('fs');
const path = require('path');

module.exports = function(app) {
  // Use express json parser for requests up to 50MB
  const express = require('express');
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Endpoint to save site_settings.json directly to public/ on disk
  app.post('/api/save-settings', (req, res) => {
    try {
      const settingsData = req.body;
      if (!settingsData || typeof settingsData !== 'object' || Object.keys(settingsData).length === 0) {
        return res.status(400).json({ success: false, error: 'Empty or invalid settings payload' });
      }

      const jsonString = JSON.stringify(settingsData, null, 2);

      // Save to public/site_settings.json
      const publicPath = path.join(__dirname, '..', 'public', 'site_settings.json');
      fs.writeFileSync(publicPath, jsonString, 'utf-8');

      // Also sync to build/site_settings.json if build folder exists
      const buildDir = path.join(__dirname, '..', 'build');
      if (fs.existsSync(buildDir)) {
        const buildPath = path.join(buildDir, 'site_settings.json');
        fs.writeFileSync(buildPath, jsonString, 'utf-8');
      }

      console.log('✅ [API] Successfully written site_settings.json to disk');
      return res.json({
        success: true,
        message: 'Successfully saved site_settings.json to disk!'
      });
    } catch (err) {
      console.error('❌ [API] Error saving site_settings.json:', err);
      return res.status(500).json({
        success: false,
        error: err.message || 'Failed to save settings'
      });
    }
  });

  // Endpoint to read site_settings.json directly from disk
  app.get('/api/get-settings', (req, res) => {
    try {
      const publicPath = path.join(__dirname, '..', 'public', 'site_settings.json');
      if (fs.existsSync(publicPath)) {
        const fileContent = fs.readFileSync(publicPath, 'utf-8');
        return res.json(JSON.parse(fileContent));
      }
      return res.status(404).json({ error: 'site_settings.json not found on disk' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });
};
