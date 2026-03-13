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

    // Convert relative avatar URL to full URL for frontend
    if (profile.avatarUrl) {
      const backendUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
      profile.avatarUrl = `${backendUrl}${profile.avatarUrl}`;
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

    const updated = await this.userProfileRepository.updateByUserId(
      user.id,
      payload
    );

    // Convert relative avatar URL to full URL for frontend
    if (updated.avatarUrl) {
      const backendUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
      updated.avatarUrl = `${backendUrl}${updated.avatarUrl}`;
    }

    return updated;
  }
}

module.exports = new UserProfileService();
