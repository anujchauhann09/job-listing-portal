const jobSeekerService = require('./job-seeker.service');
const jobSeekerValidator = require('./job-seeker.validators');

const { ApiResponse } = require('@/responses/api.response');
const { HTTP_STATUS } = require('@/constants/http-status');
const { JOB_SEEKER_MESSAGES } = require('./job-seeker.constants');


const getMyProfile = async (req, res, next) => {
  try {
    const profile =
      await jobSeekerService.getProfile(req.user.sub);

    return new ApiResponse({
      success: true,
      message: JOB_SEEKER_MESSAGES.PROFILE_FETCHED,
      data: profile,
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const validatedData =
      jobSeekerValidator.updateProfileSchema.parse(req.body);

    const profile = await jobSeekerService.updateProfile(
      req.user.sub,
      validatedData
    );

    return new ApiResponse({
      success: true,
      message: JOB_SEEKER_MESSAGES.PROFILE_UPDATED,
      data: profile,
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getMyProfile,
  updateProfile,
};
