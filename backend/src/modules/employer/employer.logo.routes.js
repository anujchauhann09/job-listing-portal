const express = require('express');
const router = express.Router();

const { authenticate } = require('@/middlewares/auth.middleware');
const { authorize } = require('@/middlewares/auth.middleware');
const { createUploadMiddleware } = require('@/modules/file/file.middleware');

const employerLogoController = require('./employer.logo.controller');

router.use(authenticate);
router.use(authorize(['EMPLOYER']));

router.post(
  '/logo',
  createUploadMiddleware('LOGO').single('logo'),
  employerLogoController.uploadLogo
);

router.get(
  '/logo',
  employerLogoController.getLogo
);

router.get(
  '/logo/download',
  employerLogoController.downloadLogo
);

router.delete(
  '/logo',
  employerLogoController.deleteLogo
);


module.exports = router;
