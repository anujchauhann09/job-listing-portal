const express = require('express');
const router = express.Router();

const { authenticate } = require('@/middlewares/auth.middleware');
const { createUploadMiddleware } = require('@/modules/file/file.middleware');
const { analyzeResume } = require('./resume-analyzer.controller');

router.use(authenticate);

router.post(
  '/analyze',
  createUploadMiddleware('RESUME').single('file'),
  analyzeResume
);

module.exports = router;
