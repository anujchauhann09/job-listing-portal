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

    if (!user) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'User not found',
      });
    }

    const profile = await this.jobSeekerRepository.findByUserId(user.id);

    if (!profile) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: JOB_SEEKER_MESSAGES.PROFILE_NOT_FOUND,
      });
    }

    // Convert relative resume URL to full URL for frontend
    if (profile.profile && profile.profile.resumeUrl) {
      const backendUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
      profile.profile.resumeUrl = `${backendUrl}${profile.profile.resumeUrl}`;
    }

    return profile;
  }

  async updateProfile(userUuid, payload) {
    const user = await this.jobSeekerRepository.getUserByUuid(userUuid);

    if (!user) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'User not found',
      });
    }

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

    const updated = await this.jobSeekerRepository.updateByUserId(
      user.id,
      updateData
    );

    // Convert relative resume URL to full URL for frontend
    if (updated.profile && updated.profile.resumeUrl) {
      const backendUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
      updated.profile.resumeUrl = `${backendUrl}${updated.profile.resumeUrl}`;
    }

    return updated;
  }
}

module.exports = new JobSeekerService();
