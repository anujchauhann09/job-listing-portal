const prisma = require('@/config/prisma');

class JobApplicationRepository {
  findJobSeekerByUuid(uuid) {
    return prisma.jobSeeker.findUnique({
      where: { uuid },
      select: { id: true }
    });
  }


  findEmployerByUuid(uuid) {
    return prisma.employer.findUnique({
      where: { uuid },
      select: { id: true }
    });
  }

  
  findByUuid(uuid) {
    return prisma.jobApplication.findUnique({
      where: { uuid }
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


  createApplication(tx, data) {
    return tx.jobApplication.create({
      data
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
