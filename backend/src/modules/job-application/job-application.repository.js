const prisma = require('@/config/prisma');

class JobApplicationRepository {
  findJobSeekerByUserUuid(userUuid) {
    return prisma.jobSeeker.findFirst({
      where: {
        user: { uuid: userUuid }
      },
      select: { id: true, resumeUrl: true }
    });
  }

  findEmployerByUserUuid(userUuid) {
    return prisma.employer.findFirst({
      where: {
        user: { uuid: userUuid }
      }
    ,
      select: { id: true }
    });
  }

  findByUuidWithDetails(uuid) {
    return prisma.jobApplication.findUnique({
      where: { uuid },
      select: {
        uuid: true,
        status: true,
        appliedAt: true,
        coverLetter: true,
        resumeUrl: true,
        jobSeeker: {
          select: {
            uuid: true,
            user: {
              select: {
                profile: {
                  select: {
                    name: true,
                    avatarUrl: true
                  }
                }
              }
            }
          }
        },
        job: {
          select: {
            uuid: true,
            title: true,
            location: true,
            jobType: true,
            employerId: true,
            employer: {
              select: {
                id: true,
                companyName: true,
                companyLogoUrl: true
              }
            }
          }
        }
      }
    });
  }

  findByUuid(uuid) {
    return prisma.jobApplication.findUnique({
      where: { uuid },
      select: {
        id: true,
        uuid: true,
        jobId: true,
        jobSeekerId: true,
        status: true,
        resumeUrl: true,
        coverLetter: true,
        appliedAt: true,
      }
    });
  }

  exists(jobId, jobSeekerId) {
    return prisma.jobApplication.findFirst({
      where: {
        jobId,
        jobSeekerId,
        isDeleted: false
      },
      select: { id: true }
    });
  }

  createApplication(data) {
    return prisma.jobApplication.create({
      data,
      select: this.publicApplicationSelect()
    });
  }

  updateStatus(applicationId, status) {
    return prisma.jobApplication.update({
      where: { id: applicationId },
      data: { status },
      select: this.publicApplicationSelect()
    });
  }

  findByJobSeeker(jobSeekerId, query) {
    const { page, limit, status } = query;
    const skip = (page - 1) * limit;

    return prisma.jobApplication.findMany({
      where: {
        jobSeekerId,
        isDeleted: false,
        ...(status && { status })
      },
      skip,
      take: limit,
      orderBy: { appliedAt: 'desc' },
      select: this.jobSeekerApplicationSelect()
    });
  }

  findByJob(jobId, query) {
    const { page, limit, status } = query;
    const skip = (page - 1) * limit;

    return prisma.jobApplication.findMany({
      where: {
        jobId,
        isDeleted: false,
        ...(status && { status })
      },
      skip,
      take: limit,
      orderBy: { appliedAt: 'desc' },
      select: this.employerApplicationSelect()
    });
  }

  publicApplicationSelect() {
    return {
      uuid: true,
      status: true,
      appliedAt: true,
      updatedAt: true
    };
  }

  jobSeekerApplicationSelect() {
    return {
      uuid: true,
      status: true,
      appliedAt: true,
      job: {
        select: {
          uuid: true,
          title: true,
          location: true,
          jobType: true,
          employer: {
            select: {
              companyName: true,
              companyLogoUrl: true
            }
          }
        }
      }
    };
  }

  employerApplicationSelect() {
    return {
      uuid: true,
      status: true,
      appliedAt: true,
      coverLetter: true,
      resumeUrl: true,
      jobSeeker: {
        select: {
          uuid: true,
          user: {
            select: {
              profile: {
                select: {
                  name: true,
                  avatarUrl: true
                }
              }
            }
          }
        }
      }
    };
  }

  toPublicApplication(application) {
    return {
      uuid: application.uuid,
      status: application.status,
      appliedAt: application.appliedAt
    };
  }
}

module.exports = new JobApplicationRepository();
