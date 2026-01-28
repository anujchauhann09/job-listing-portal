const JobSeekerRepository = require("./job-seeker.repository");

const AppException = require("@/exceptions/app.exception");
const { HTTP_STATUS } = require("@/constants/http-status");
const { JOB_SEEKER_MESSAGES } = require("./job-seeker.constants");

class JobSeekerService {
  constructor() {
    this.jobSeekerRepository = new JobSeekerRepository();
  }

  async getProfile(userUuid) {
    const user = await this.jobSeekerRepository.getUserByUuid(userUuid);

    const profile = await this.jobSeekerRepository.findByUserId(user.id);

    if (!profile) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: JOB_SEEKER_MESSAGES.PROFILE_NOT_FOUND,
      });
    }

    return profile;
  }

  async updateProfile(userUuid, payload) {
    const user = await this.jobSeekerRepository.getUserByUuid(userUuid);

    const profile = await this.jobSeekerRepository.findByUserId(user.id);

    if (!profile) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: JOB_SEEKER_MESSAGES.PROFILE_NOT_FOUND,
      });
    }

    let updateData = { ...payload };

    if (payload.skills) {
      const skillIds = await this.jobSeekerRepository.resolveSkills(
        payload.skills
      );
      updateData.skills = skillIds;
    }

    return this.jobSeekerRepository.updateByUserId(
      user.id,
      updateData
    );
  }
}

module.exports = new JobSeekerService();
