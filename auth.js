const express = require('express');
const router = express.Router();

router.post('/verify', (req, res) => {
  res.json({ valid: true });
});

router.post('/logout', (req, res) => {
  res.json({ success: true });
});

module.exports = router;
