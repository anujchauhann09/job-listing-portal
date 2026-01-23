const express = require('express');
const router = express.Router();

const { authenticate, authorize } = require('@/middlewares/auth.middleware');

const resumeController = require('./job-seeker.resume.controllers');
const { uploadResume } = require('@/modules/file/file.middleware');

router.use(authenticate);
router.use(authorize(['JOB_SEEKER']));


router.post(
  '/resume',
  uploadResume.single('resume'),
  resumeController.uploadResume
);

router.get(
  '/resume',
  resumeController.getResume
);

router.delete(
  '/resume',
  resumeController.deleteResume
);

router.get(
  '/resume/download',
  resumeController.downloadResume
);

module.exports = router;
