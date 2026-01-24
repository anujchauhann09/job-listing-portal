const express = require('express');
const router = express.Router();

const jobSeekerController = require('./job-seeker.controller');
const { authenticate, authorize } = require('@/middlewares/auth.middleware');


router.use(authenticate);
router.use(authorize(['JOB_SEEKER']));


router.get(
  '/me',
  jobSeekerController.getMyProfile
);

router.patch(
  '/me',
  jobSeekerController.updateProfile
);


module.exports = router;
