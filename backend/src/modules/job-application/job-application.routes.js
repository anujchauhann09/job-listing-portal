const express = require('express');
const router = express.Router();

const jobApplicationController = require('./job-application.controller');
const { authenticate, authorize } = require('@/middlewares/auth.middleware');


router.post(
  '/jobs/:uuid/apply',
  authenticate,
  authorize('JOB_SEEKER'),
  jobApplicationController.applyToJob
);


router.get(
  '/job-seeker/applications',
  authenticate,
  authorize('JOB_SEEKER'),
  jobApplicationController.getMyApplications
);


router.patch(
  '/applications/:uuid/withdraw',
  authenticate,
  authorize('JOB_SEEKER'),
  jobApplicationController.withdrawApplication
);


router.get(
  '/employer/jobs/:uuid/applications',
  authenticate,
  authorize('EMPLOYER'),
  jobApplicationController.getApplicationsForJob
);


router.patch(
  '/applications/:uuid/status',
  authenticate,
  authorize('EMPLOYER'),
  jobApplicationController.updateApplicationStatus
);

module.exports = router;
