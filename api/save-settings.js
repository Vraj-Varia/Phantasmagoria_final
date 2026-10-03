const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const settingsData = req.body;
    if (!settingsData || typeof settingsData !== 'object' || Object.keys(settingsData).length === 0) {
      return res.status(400).json({ success: false, error: 'Empty or invalid settings payload' });
    }

    const jsonString = JSON.stringify(settingsData, null, 2);
    const publicPath = path.join(process.cwd(), 'public', 'site_settings.json');
    fs.writeFileSync(publicPath, jsonString, 'utf-8');

    return res.status(200).json({
      success: true,
      message: 'Successfully saved site_settings.json!'
    });
  } catch (err) {
    console.error('API Error saving site_settings.json:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to save settings'
    });
  }
};
