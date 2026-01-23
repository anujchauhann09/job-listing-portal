const fs = require('fs');
const path = require('path');

const jobSeekerRepository = require('./job-seeker.repositories');
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { JOB_SEEKER_MESSAGES, RESUME_MESSAGES } = require('./job-seeker.constants');


const uploadResume = async (userUuid, file) => {
  const user = await jobSeekerRepository.getUserByUuid(userUuid);
  const profile = await jobSeekerRepository.findByUserId(user.id);

  if (!profile || profile.isDeleted) {
    throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: JOB_SEEKER_MESSAGES.PROFILE_NOT_FOUND
    });
  }

  if (profile.resumeUrl) {
    const oldPath = path.join(process.cwd(), profile.resumeUrl);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  }

  const resumeUrl = `/uploads/resumes/${file.filename}`;

  await jobSeekerRepository.updateResume(
    user.id,
    resumeUrl
  );

  return { resumeUrl };
};

const getResume = async (userUuid) => {
  const user = await jobSeekerRepository.getUserByUuid(userUuid);
  const profile = await jobSeekerRepository.findByUserId(user.id);

  if (!profile || !profile.resumeUrl) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: RESUME_MESSAGES.RESUME_NOT_FOUND
    });
  }

  return { resumeUrl: profile.resumeUrl };
};

const deleteResume = async (userUuid) => {
  const user = await jobSeekerRepository.getUserByUuid(userUuid);
  const profile = await jobSeekerRepository.findByUserId(user.id);

  if (!profile || !profile.resumeUrl) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: RESUME_MESSAGES.RESUME_NOT_FOUND
    });
  }

  const filePath = path.join(process.cwd(), profile.resumeUrl);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  await jobSeekerRepository.updateResume(user.id, null);
};

const getResumeFile = async (userUuid) => {
  const user =
    await jobSeekerRepository.getUserByUuid(userUuid);

  const profile =
    await jobSeekerRepository.findByUserId(user.id);

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
};

module.exports = {
  uploadResume,
  getResume,
  deleteResume,
  getResumeFile
};
