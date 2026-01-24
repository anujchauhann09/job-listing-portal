const prisma = require("@/config/prisma");
const { AppException } = require("@/exceptions/app.exception");
const { HTTP_STATUS } = require("@/constants/http-status");
const { JOB_SEEKER_MESSAGES } = require("./job-seeker.constants");


const getUserByUuid = async (uuid) => {
  const user = await prisma.user.findUnique({
    where: { uuid },
    select: {
      id: true
    }
  });

  if (!user) {
    throw new AppException(
      JOB_SEEKER_MESSAGES.PROFILE_NOT_FOUND,
      HTTP_STATUS.NOT_FOUND
    );
  }

  return user; 
};


const findByUserId = async (userId) => {
  const profile = await prisma.jobSeeker.findUnique({
    where: { userId },
    select: {
      uuid: true,
      resumeUrl: true,
      experienceYears: true,
      currentTitle: true,
      currentLocation: true,
      expectedSalary: true,
      noticePeriodDays: true,

      skills: {
        select: {
          skill: {
            select: {
              name: true
            }
          }
        }
      },

      user: {
        select: {
          email: true,
          profile: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });

  if (!profile) {
    throw new AppException(
      JOB_SEEKER_MESSAGES.PROFILE_NOT_FOUND,
      HTTP_STATUS.NOT_FOUND
    );
  }

  return {
    ...profile,
    skills: profile.skills.map(s => s.skill)
  };
};


const updateByUserId = async (userId, { skills, ...data }) => {
  await prisma.jobSeeker.update({
    where: { userId },
    data: {
      ...data,
      ...(skills && {
        skills: {
          deleteMany: {},
          create: skills.map((skillId) => ({
            skillId
          }))
        }
      })
    }
  });

  return findByUserId(userId);
};


const resolveSkills = async (skills = []) => {
  const skillIds = [];

  for (const name of skills) {
    const skill = await prisma.skill.upsert({
      where: { name },
      update: {},
      create: { name }
    });

    skillIds.push(skill.id);
  }

  return skillIds; 
};


const updateResume = async (userId, resumeUrl) => {
  await prisma.jobSeeker.update({
    where: { userId },
    data: { resumeUrl }
  });

  return { resumeUrl };
};


module.exports = {
  getUserByUuid,
  findByUserId,
  updateByUserId,
  resolveSkills,
  updateResume
};
