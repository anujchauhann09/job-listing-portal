const express = require('express');
const router = express.Router();

// const { publicLimiter } = require('@/middlewares/rateLimiters');

router.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

module.exports = router;
