const express = require('express');
const router = express.Router();

const { authenticate } = require('@/middlewares/auth.middleware');
const { createUploadMiddleware } = require('./file.middleware');
const fileUploadController = require('./file.access.controller');


router.use(authenticate);


router.post(
  '/resume',
  createUploadMiddleware('RESUME').single('file'),
  fileUploadController.uploadResume
);


router.post(
  '/avatar',
  createUploadMiddleware('AVATAR').single('file'),
  fileUploadController.uploadAvatar
);


router.post(
  '/logo',
  createUploadMiddleware('LOGO').single('file'),
  fileUploadController.uploadLogo
);

module.exports = router;
