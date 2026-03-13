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

    if (!user) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'User not found',
      });
    }

    const profileData =
      await this.jobSeekerRepository.findByUserId(user.id);

    if (!profileData || !profileData.profile) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: JOB_SEEKER_MESSAGES.PROFILE_NOT_FOUND
      });
    }

    // Remove old resume if exists
    if (profileData.profile.resumeUrl) {
      const oldPath = path.join(process.cwd(), profileData.profile.resumeUrl);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Store relative path in database for backend use
    const relativePath = `/uploads/resumes/${file.filename}`;

    await this.jobSeekerRepository.updateResume(
      user.id,
      relativePath
    );

    // Return full backend URL for frontend to use
    const backendUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
    const resumeUrl = `${backendUrl}${relativePath}`;

    return { resumeUrl };
  }

  async getResume(userUuid) {
    const user =
      await this.jobSeekerRepository.getUserByUuid(userUuid);

    if (!user) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'User not found',
      });
    }

    const profileData =
      await this.jobSeekerRepository.findByUserId(user.id);

    if (!profileData || !profileData.profile || !profileData.profile.resumeUrl) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: RESUME_MESSAGES.RESUME_NOT_FOUND
      });
    }

    // Return full backend URL for frontend to use
    const backendUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
    const resumeUrl = `${backendUrl}${profileData.profile.resumeUrl}`;

    return { resumeUrl };
  }

  async deleteResume(userUuid) {
    const user =
      await this.jobSeekerRepository.getUserByUuid(userUuid);

    if (!user) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'User not found',
      });
    }

    const profileData =
      await this.jobSeekerRepository.findByUserId(user.id);

    if (!profileData || !profileData.profile || !profileData.profile.resumeUrl) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: RESUME_MESSAGES.RESUME_NOT_FOUND
      });
    }

    const filePath =
      path.join(process.cwd(), profileData.profile.resumeUrl);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await this.jobSeekerRepository.updateResume(user.id, null);
  }

  async getResumeFile(userUuid) {
    const user =
      await this.jobSeekerRepository.getUserByUuid(userUuid);

    if (!user) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'User not found',
      });
    }

    const profileData =
      await this.jobSeekerRepository.findByUserId(user.id);

    if (!profileData || !profileData.profile || !profileData.profile.resumeUrl) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: RESUME_MESSAGES.RESUME_NOT_FOUND
      });
    }

    const filePath = profileData.profile.resumeUrl;
    const fileName = filePath.split('/').pop();

    return {
      filePath,
      fileName
    };
  }
}

module.exports = new JobSeekerResumeService();
