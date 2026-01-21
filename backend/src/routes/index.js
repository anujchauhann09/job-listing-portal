const express = require("express");
const authRoutes = require('@/modules/auth/auth.routes');
const oauthRoutes = require('@/modules/auth/oauth/oauth.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/auth/oauth', oauthRoutes);

module.exports = router;

