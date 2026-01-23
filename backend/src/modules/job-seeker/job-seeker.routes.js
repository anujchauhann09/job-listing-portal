const express = require('express');
const router = express.Router();

const jobSeekerController = require('./job-seeker.controllers');
const { authenticate, authorize } = require('@/middlewares/auth.middleware');


router.use(authenticate);
router.use(authorize(['JOB_SEEKER']));


router.post(
  '/',
  jobSeekerController.createProfile
);

router.get(
  '/me',
  jobSeekerController.getMyProfile
);

router.patch(
  '/me',
  jobSeekerController.updateProfile
);

router.delete(
  '/me',
  jobSeekerController.deleteProfile
);


module.exports = router;
