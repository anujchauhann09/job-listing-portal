const prisma = require("@/config/prisma");

class JobSeekerRepository {
  async getUserByUuid(uuid) {
    return prisma.user.findUnique({
      where: { uuid },
      select: {
        id: true,
      },
    });
  }

  async findByUserId(userId) {
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
                name: true,
              },
            },
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

    if (!profile) return null;

    // Restructure to match API documentation
    return {
      user: {
        name: profile.user.profile?.name || null,
        email: profile.user.email,
      },
      profile: {
        experienceYears: profile.experienceYears,
        currentTitle: profile.currentTitle,
        currentLocation: profile.currentLocation,
        expectedSalary: profile.expectedSalary,
        noticePeriodDays: profile.noticePeriodDays,
        resumeUrl: profile.resumeUrl,
        skills: profile.skills.map((s) => s.skill.name),
      },
    };
  }

  async updateByUserId(userId, { skills, ...data }) {
    await prisma.jobSeeker.update({
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

    return this.findByUserId(userId);
  }

  async resolveSkills(skills = []) {
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
  }

  async updateResume(userId, resumeUrl) {
    await prisma.jobSeeker.update({
      where: { userId },
      data: { resumeUrl },
    });

    return { resumeUrl };
  }
}

module.exports = JobSeekerRepository;
