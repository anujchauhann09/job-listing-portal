const jobSeekerRepository = require('./job-seeker.repositories');

const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { JOB_SEEKER_MESSAGES } = require('./job-seeker.constants');


const createProfile = async (userUuid, payload) => {
  const user = await jobSeekerRepository.getUserByUuid(userUuid);

  const existingProfile =
    await jobSeekerRepository.findByUserId(user.id);

  if (existingProfile && !existingProfile.isDeleted) {
    throw new AppException({
      status: HTTP_STATUS.CONFLICT,
      message: JOB_SEEKER_MESSAGES.PROFILE_ALREADY_EXISTS
    });
  }

  let skillIds = [];
  if (payload.skills?.length) {
    skillIds = await jobSeekerRepository.resolveSkills(payload.skills);
  }

  return jobSeekerRepository.create({
    userId: user.id,
    ...payload,
    skills: skillIds
  });
};

const getProfile = async (userUuid) => {
  const user = await jobSeekerRepository.getUserByUuid(userUuid);

  const profile =
    await jobSeekerRepository.findByUserId(user.id);

  if (!profile || profile.isDeleted) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: JOB_SEEKER_MESSAGES.PROFILE_NOT_FOUND
    });
  }

  return profile;
};

const updateProfile = async (userUuid, payload) => {
  const user = await jobSeekerRepository.getUserByUuid(userUuid);

  const profile =
    await jobSeekerRepository.findByUserId(user.id);

  if (!profile || profile.isDeleted) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: JOB_SEEKER_MESSAGES.PROFILE_NOT_FOUND
    });
  }

  let updateData = { ...payload };

  if (payload.skills) {
    const skillIds = await jobSeekerRepository.resolveSkills(payload.skills);
    updateData.skills = skillIds;
  }

  return jobSeekerRepository.updateByUserId(
    user.id,
    updateData
  );
};

const deleteProfile = async (userUuid) => {
  const user = await jobSeekerRepository.getUserByUuid(userUuid);

  const profile =
    await jobSeekerRepository.findByUserId(user.id);

  if (!profile || profile.isDeleted) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: JOB_SEEKER_MESSAGES.PROFILE_NOT_FOUND
    });
  }

  await jobSeekerRepository.softDeleteByUserId(user.id);
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile
};
