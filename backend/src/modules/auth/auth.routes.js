const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
const { authenticate } = require('@/middlewares/auth.middleware');
// const { authLimiter } = require('@/middlewares/rateLimiters');

router.post(
    '/register',
    // authLimiter, 
    authController.register
);

router.post(
    '/login', 
    // authLimiter, 
    authController.login
);

router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);
router.post('/session', authController.exchangeOAuthSession);
router.get('/me', authenticate, authController.getMe);
router.delete('/account', authenticate, authController.deleteAccount);

module.exports = router;
