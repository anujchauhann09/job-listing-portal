const employerService = require('./employer.services');
const employerValidator = require('./employer.validators');

const { ApiResponse } = require('@/responses/api.response');
const { HTTP_STATUS } = require('@/constants/http-status');
const { EMPLOYER_MESSAGES } = require('./employer.constants');

const createProfile = async (req, res, next) => {
  try {
    const validatedData =
      employerValidator.createEmployerProfileSchema.parse(req.body);

    const profile = await employerService.createProfile(
      req.user.sub,
      validatedData
    );

    return new ApiResponse({
      success: true,
      message: EMPLOYER_MESSAGES.PROFILE_CREATED,
      data: profile
    }).send(res, HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    const profile =
      await employerService.getProfile(req.user.sub);

    return new ApiResponse({
      success: true,
      message: EMPLOYER_MESSAGES.PROFILE_FETCHED,
      data: profile
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const validatedData =
      employerValidator.updateEmployerProfileSchema.parse(req.body);

    const profile = await employerService.updateProfile(
      req.user.sub,
      validatedData
    );

    return new ApiResponse({
      success: true,
      message: EMPLOYER_MESSAGES.PROFILE_UPDATED,
      data: profile
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

const getPublicProfile = async (req, res, next) => {
  try {
    const profile =
      await employerService.getPublicProfile(req.params.companySlug);

    return new ApiResponse({
      success: true,
      data: profile
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProfile,
  getMyProfile,
  updateProfile,
  getPublicProfile
};
