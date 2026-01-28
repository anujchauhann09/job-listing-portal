const UserProfileRepository = require('./user-profile.repository');
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { USER_PROFILE_MESSAGES } = require('./user-profile.constants');

class UserProfileService {
  constructor() {
    this.userProfileRepository = new UserProfileRepository();
  }

  async getProfile(userUuid) {
    const user =
      await this.userProfileRepository.getUserByUuid(userUuid);

    if (!user) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: USER_PROFILE_MESSAGES.PROFILE_NOT_FOUND
      });
    }

    const profile =
      await this.userProfileRepository.findByUserId(user.id);

    if (!profile) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: USER_PROFILE_MESSAGES.PROFILE_NOT_FOUND
      });
    }

    return profile;
  }

  async updateProfile(userUuid, payload) {
    const user =
      await this.userProfileRepository.getUserByUuid(userUuid);

    if (!user) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: USER_PROFILE_MESSAGES.PROFILE_NOT_FOUND
      });
    }

    const existing =
      await this.userProfileRepository.findByUserId(user.id);

    if (!existing) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: USER_PROFILE_MESSAGES.PROFILE_NOT_FOUND
      });
    }

    return this.userProfileRepository.updateByUserId(
      user.id,
      payload
    );
  }
}

module.exports = new UserProfileService();
