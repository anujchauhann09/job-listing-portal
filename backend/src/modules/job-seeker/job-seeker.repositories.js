const prisma = require("@/config/prisma");
const { AppException } = require("@/exceptions/app.exception");
const { HTTP_STATUS } = require("@/constants/http-status");
const { JOB_SEEKER_MESSAGES } = require("./job-seeker.constants");


const getUserByUuid = async (uuid) => {
  const user = await prisma.user.findUnique({
    where: { uuid },
    select: {
      id: true,
      isActive: true,
      isDeleted: true
    }
  });

  if (!user || user.isDeleted || !user.isActive) {
    throw new AppException(
      JOB_SEEKER_MESSAGES.USER_NOT_FOUND,
      HTTP_STATUS.NOT_FOUND
    );
  }

  return user; 
};

const findByUserId = (userId) => {
  return prisma.jobSeeker.findUnique({
    where: { userId },
    include: {
      skills: {
        include: {
          skill: true,
        },
      },
      user: {
        select: {
          email: true,
          profile: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
};

const create = async ({ userId, skills = [], ...data }) => {
  return prisma.jobSeeker.create({
    data: {
      userId,
      ...data,
      skills: {
        create: skills.map((skillId) => ({
          skillId,
        })),
      },
    },
  });
};

const updateByUserId = async (userId, { skills, ...data }) => {
  return prisma.jobSeeker.update({
    where: { userId },
    data: {
      ...data,
      ...(skills && {
        skills: {
          deleteMany: {},
          create: skills.map((skillId) => ({
            skillId,
          })),
        },
      }),
    },
  });
};

const softDeleteByUserId = (userId) => {
  return prisma.jobSeeker.update({
    where: { userId },
    data: { isDeleted: true },
  });
};

const resolveSkills = async (skills = []) => {
  const skillIds = [];

  for (const name of skills) {
    const skill = await prisma.skill.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    skillIds.push(skill.id);
  }

  return skillIds;
};


const updateResume = async (userId, resumeUrl) => {
  return prisma.jobSeeker.update({
    where: { userId },
    data: { resumeUrl }
  });
};

module.exports = {
  getUserByUuid,
  findByUserId,
  create,
  updateByUserId,
  softDeleteByUserId,
  resolveSkills,
  updateResume
};
