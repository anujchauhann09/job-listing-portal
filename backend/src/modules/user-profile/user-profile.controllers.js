const userProfileService = require('./user-profile.services');
const userProfileValidator = require('./user-profile.validators');

const { ApiResponse } = require('@/responses/api.response');
const { HTTP_STATUS } = require('@/constants/http-status');
const { USER_PROFILE_MESSAGES } = require('./user-profile.constants');

const getMyProfile = async (req, res, next) => {
  try {
    const profile = await userProfileService.getProfile(
      req.user.sub
    );

    return new ApiResponse({
      success: true,
      message: USER_PROFILE_MESSAGES.PROFILE_FETCHED,
      data: profile
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

const updateMyProfile = async (req, res, next) => {
  try {
    const validatedData =
      userProfileValidator.updateUserProfileSchema.parse(req.body);

    const profile = await userProfileService.updateProfile(
      req.user.sub,
      validatedData
    );

    return new ApiResponse({
      success: true,
      message: USER_PROFILE_MESSAGES.PROFILE_UPDATED,
      data: profile
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile
};
