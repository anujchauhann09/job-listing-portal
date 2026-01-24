const jobSeekerRepository = require('./job-seeker.repository');

const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { JOB_SEEKER_MESSAGES } = require('./job-seeker.constants');


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


module.exports = {
  getProfile,
  updateProfile,
};
