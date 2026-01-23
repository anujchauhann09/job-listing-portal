const express = require("express");

const authRoutes = require('@/modules/auth/auth.routes');
const oauthRoutes = require('@/modules/auth/oauth/oauth.routes');

const jobSeekerRoutes = require('@/modules/job-seeker/job-seeker.routes');
const jobSeekerResumeRoutes = require('@/modules/job-seeker/job-seeker.resume.routes');

const employerRoutes = require('@/modules/employer/employer.routes');
const employerLogoRoutes = require('@/modules/employer/employer.logo.routes');

const userProfileRoutes = require('@/modules/user-profile/user-profile.routes');
const userProfileAvatarRoutes = require('@/modules/user-profile/user-prorfile.avatar.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/auth/oauth', oauthRoutes);


router.use('/job-seeker/profile', jobSeekerRoutes);
router.use('/job-seeker/profile', jobSeekerResumeRoutes);

router.use('/employer/profile', employerRoutes);
router.use('/employer/profile', employerLogoRoutes);

router.use('/user/profile', userProfileRoutes);
router.use('/user/profile', userProfileAvatarRoutes);

module.exports = router;

