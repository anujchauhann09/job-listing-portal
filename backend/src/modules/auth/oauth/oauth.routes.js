const express = require('express');
const router = express.Router();
const oauthController = require('./oauth.controllers');

router.get('/:provider', oauthController.redirectToProvider);
router.get('/:provider/callback', oauthController.handleCallback);

module.exports = router;
