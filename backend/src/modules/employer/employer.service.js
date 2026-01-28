const EmployerRepository = require('./employer.repository');

const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { EMPLOYER_MESSAGES } = require('./employer.constants');

class EmployerService {
  constructor() {
    this.repo = new EmployerRepository();
  }

  async createProfile(userUuid, payload) {
    const user = await this.repo.getUserByUuid(userUuid);

    if (!user) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: EMPLOYER_MESSAGES.USER_NOT_FOUND,
      });
    }

    const existing = await this.repo.findByUserId(user.id);
    if (existing) {
      throw new AppException({
        status: HTTP_STATUS.CONFLICT,
        message: EMPLOYER_MESSAGES.PROFILE_ALREADY_EXISTS,
      });
    }

    return this.repo.create({
      userId: user.id,
      ...payload,
    });
  }

  async getProfile(userUuid) {
    const user = await this.repo.getUserByUuid(userUuid);

    if (!user) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: EMPLOYER_MESSAGES.USER_NOT_FOUND,
      });
    }

    const profile = await this.repo.findByUserId(user.id);
    if (!profile) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: EMPLOYER_MESSAGES.PROFILE_NOT_FOUND,
      });
    }

    return profile;
  }

  async updateProfile(userUuid, payload) {
    const user = await this.repo.getUserByUuid(userUuid);

    if (!user) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: EMPLOYER_MESSAGES.USER_NOT_FOUND,
      });
    }

    const profile = await this.repo.findByUserId(user.id);
    if (!profile) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: EMPLOYER_MESSAGES.PROFILE_NOT_FOUND,
      });
    }

    return this.repo.updateByUserId(user.id, payload);
  }

  async getPublicProfile(companySlug) {
    const profile = await this.repo.findBySlug(companySlug);

    if (!profile) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: EMPLOYER_MESSAGES.PROFILE_NOT_FOUND,
      });
    }

    return profile;
  }
}

module.exports = new EmployerService();
