const fs = require('fs');
const path = require('path');

const UserProfileRepository = require('./user-profile.repository');
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const {
  USER_PROFILE_MESSAGES,
  AVATAR_MESSAGES
} = require('./user-profile.constants');

class UserProfileAvatarService {
  constructor() {
    this.userProfileRepository = new UserProfileRepository();
  }

  async uploadAvatar(userUuid, file) {
    const user =
      await this.userProfileRepository.getUserByUuid(userUuid);

    const profile =
      await this.userProfileRepository.findByUserId(user.id);

    if (!profile || profile.isDeleted) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: USER_PROFILE_MESSAGES.PROFILE_NOT_FOUND
      });
    }

    // Remove old avatar if exists
    if (profile.avatarUrl) {
      const oldPath = path.join(process.cwd(), profile.avatarUrl);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const avatarUrl = `/uploads/avatars/${file.filename}`;

    await this.userProfileRepository.updateByUserId(
      user.id,
      { avatarUrl }
    );

    return { avatarUrl };
  }

  async getAvatar(userUuid) {
    const user =
      await this.userProfileRepository.getUserByUuid(userUuid);

    const profile =
      await this.userProfileRepository.findByUserId(user.id);

    if (!profile || !profile.avatarUrl) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: AVATAR_MESSAGES.AVATAR_NOT_FOUND
      });
    }

    return { avatarUrl: profile.avatarUrl };
  }

  async getAvatarFile(userUuid) {
    const user =
      await this.userProfileRepository.getUserByUuid(userUuid);

    const profile =
      await this.userProfileRepository.findByUserId(user.id);

    if (!profile || !profile.avatarUrl) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: AVATAR_MESSAGES.AVATAR_NOT_FOUND
      });
    }

    return {
      filePath: profile.avatarUrl,
      fileName: profile.avatarUrl.split('/').pop()
    };
  }

  async deleteAvatar(userUuid) {
    const user =
      await this.userProfileRepository.getUserByUuid(userUuid);

    const profile =
      await this.userProfileRepository.findByUserId(user.id);

    if (!profile || !profile.avatarUrl) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: AVATAR_MESSAGES.AVATAR_NOT_FOUND
      });
    }

    const filePath =
      path.join(process.cwd(), profile.avatarUrl);

    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await this.userProfileRepository.updateByUserId(
      user.id,
      { avatarUrl: null }
    );
  }
}

module.exports = new UserProfileAvatarService();
