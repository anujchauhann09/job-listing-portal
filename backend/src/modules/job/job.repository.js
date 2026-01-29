const prisma = require('@/config/prisma');

class JobRepository {
  findJobById(id) {
    return prisma.job.findUnique({
      where: { id }
    });
  }

  findEmployerByUserUuid(userUuid) {
    return prisma.employer.findFirst({
      where: {
        user: {
          uuid: userUuid
        }
      },
      select: { id: true }
    });
  }

  findJobByUuid(uuid) {
    return prisma.job.findUnique({
      where: { uuid }
    });
  }

  createJob(tx, employerId, data) {
    return tx.job.create({
      data: {
        ...data,
        employerId
      }
    });
  }

  updateJob(tx, jobId, data) {
    return tx.job.update({
      where: { id: jobId },
      data
    });
  }

  softDelete(jobId) {
    return prisma.job.update({
      where: { id: jobId },
      data: {
        isDeleted: true,
        isActive: false
      }
    });
  }

  attachSkills(tx, jobId, skillIds) {
    return tx.jobSkill.createMany({
      data: skillIds.map((skillId) => ({ jobId, skillId })),
      skipDuplicates: true
    });
  }

  replaceSkills(tx, jobId, skillIds) {
    return tx.jobSkill.deleteMany({ where: { jobId } })
      .then(() =>
        tx.jobSkill.createMany({
          data: skillIds.map((skillId) => ({ jobId, skillId })),
          skipDuplicates: true
        })
      );
  }

  findJobsByEmployerId(employerId) {
    return prisma.job.findMany({
      where: { employerId, isDeleted: false },
      orderBy: { createdAt: 'desc' },
      select: this.publicJobSelect()
    });
  }

  findPublicJobByUuid(uuid) {
    return prisma.job.findFirst({
      where: {
        uuid,
        isActive: true,
        isDeleted: false,
        status: 'OPEN'
      },
      select: this.publicJobSelect(true)
    });
  }

  findPublicJobs(query) {
    const { page, limit, location, jobType, salaryMin, salaryMax, sortBy, sortOrder } = query;
    const skip = (page - 1) * limit;

    return prisma.job.findMany({
      where: {
        isActive: true,
        isDeleted: false,
        status: 'OPEN',
        ...(location && { location: { contains: location, mode: 'insensitive' } }),
        ...(jobType && { jobType }),
        ...(salaryMin && { salaryMin: { gte: salaryMin } }),
        ...(salaryMax && { salaryMax: { lte: salaryMax } })
      },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: this.publicJobSelect()
    });
  }

  publicJobSelect(includeEmployer = false) {
    return {
      uuid: true,
      title: true,
      location: true,
      jobType: true,
      experienceLevel: true,
      remoteType: true,
      salaryMin: true,
      salaryMax: true,
      salaryCurrency: true,
      createdAt: true,
      ...(includeEmployer && {
        employer: {
          select: {
            companyName: true,
            companyLogoUrl: true,
            industry: true
          }
        }
      }),
      skills: {
        select: {
          skill: {
            select: {
              name: true
            }
          }
        }
      }
    };
  }

  toPublicJob(job) {
    return {
      uuid: job.uuid,
      title: job.title,
      location: job.location,
      jobType: job.jobType,
      experienceLevel: job.experienceLevel,
      remoteType: job.remoteType,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      salaryCurrency: job.salaryCurrency,
      createdAt: job.createdAt
    };
  }
}

module.exports = new JobRepository();
