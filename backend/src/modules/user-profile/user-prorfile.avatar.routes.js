const express = require('express');
const router = express.Router();

const { authenticate } = require('@/middlewares/auth.middleware');
const { uploadAvatar } = require('@/modules/file/file.avatar.middleware');
const avatarController = require('./user-profile.avatar.controllers');

router.use(authenticate);

router.post(
  '/avatar',
  uploadAvatar.single('avatar'),
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
