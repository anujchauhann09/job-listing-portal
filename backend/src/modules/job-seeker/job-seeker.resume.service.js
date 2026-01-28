const fs = require('fs');
const path = require('path');

const JobSeekerRepository = require('./job-seeker.repository');
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const {
  JOB_SEEKER_MESSAGES,
  RESUME_MESSAGES
} = require('./job-seeker.constants');

class JobSeekerResumeService {
  constructor() {
    this.jobSeekerRepository = new JobSeekerRepository();
  }

  async uploadResume(userUuid, file) {
    const user =
      await this.jobSeekerRepository.getUserByUuid(userUuid);

    const profile =
      await this.jobSeekerRepository.findByUserId(user.id);

    if (!profile || profile.isDeleted) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: JOB_SEEKER_MESSAGES.PROFILE_NOT_FOUND
      });
    }

    // Remove old resume if exists
    if (profile.resumeUrl) {
      const oldPath = path.join(process.cwd(), profile.resumeUrl);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const resumeUrl = `/uploads/resumes/${file.filename}`;

    await this.jobSeekerRepository.updateResume(
      user.id,
      resumeUrl
    );

    return { resumeUrl };
  }

  async getResume(userUuid) {
    const user =
      await this.jobSeekerRepository.getUserByUuid(userUuid);

    const profile =
      await this.jobSeekerRepository.findByUserId(user.id);

    if (!profile || !profile.resumeUrl) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: RESUME_MESSAGES.RESUME_NOT_FOUND
      });
    }

    return { resumeUrl: profile.resumeUrl };
  }

  async deleteResume(userUuid) {
    const user =
      await this.jobSeekerRepository.getUserByUuid(userUuid);

    const profile =
      await this.jobSeekerRepository.findByUserId(user.id);

    if (!profile || !profile.resumeUrl) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: RESUME_MESSAGES.RESUME_NOT_FOUND
      });
    }

    const filePath =
      path.join(process.cwd(), profile.resumeUrl);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await this.jobSeekerRepository.updateResume(user.id, null);
  }

  async getResumeFile(userUuid) {
    const user =
      await this.jobSeekerRepository.getUserByUuid(userUuid);

    const profile =
      await this.jobSeekerRepository.findByUserId(user.id);

    if (!profile || !profile.resumeUrl) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: RESUME_MESSAGES.RESUME_NOT_FOUND
      });
    }

    const filePath = profile.resumeUrl;
    const fileName = filePath.split('/').pop();

    return {
      filePath,
      fileName
    };
  }
}

module.exports = new JobSeekerResumeService();
