const express = require('express');
const router = express.Router();

const { authenticate } = require('@/middlewares/auth.middleware');
const { createUploadMiddleware } = require('@/modules/file/file.middleware');
const avatarController = require('./user-profile.avatar.controller');

router.use(authenticate);

router.post(
  '/avatar',
  createUploadMiddleware('AVATAR').single('file'),
  avatarController.uploadAvatar
);

router.get(
  '/avatar',
  avatarController.getAvatar
);

router.get(
  '/avatar/download',
  avatarController.downloadAvatar
);

router.delete(
  '/avatar',
  avatarController.deleteAvatar
);

module.exports = router;
