const express = require('express');
const router = express.Router();

const employerController = require('./employer.controller');
const { authenticate, authorize } = require('@/middlewares/auth.middleware');

router.use(authenticate);
router.use(authorize(['EMPLOYER']));


router.post(
  '/',
  employerController.createProfile
);

router.get(
  '/me',
  employerController.getMyProfile
);

router.patch(
  '/me',
  employerController.updateProfile
);

router.get(
  '/:companySlug',
  employerController.getPublicProfile
);


module.exports = router;
