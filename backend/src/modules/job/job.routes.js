const express = require('express');
const router = express.Router();

const jobController = require('./job.controller');
const { authenticate, authorize } = require('@/middlewares/auth.middleware');


router.post(
  '/employer/jobs',
  authenticate,
  authorize('EMPLOYER'),
  jobController.createJob
);

router.patch(
  '/employer/jobs/:uuid',
  authenticate,
  authorize('EMPLOYER'),
  jobController.updateJob
);

router.delete(
  '/employer/jobs/:uuid',
  authenticate,
  authorize('EMPLOYER'),
  jobController.deleteJob
);

router.get(
  '/employer/jobs',
  authenticate,
  authorize('EMPLOYER'),
  jobController.getEmployerJobs
);

router.get(
  '/jobs',
  jobController.getJobs
);

router.get(
  '/jobs/:uuid',
  jobController.getJob
);

module.exports = router;
