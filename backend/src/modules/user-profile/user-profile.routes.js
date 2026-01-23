const express = require('express');
const router = express.Router();

const userProfileController = require('./user-profile.controllers');
const { authenticate } = require('@/middlewares/auth.middleware');

router.use(authenticate);

router.get('/me', userProfileController.getMyProfile);
router.patch('/me', userProfileController.updateMyProfile);

module.exports = router;
