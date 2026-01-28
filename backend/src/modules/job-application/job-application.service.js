const prisma = require('@/config/prisma');

const jobApplicationRepository = require('./job-application.repository');
const jobRepository = require('@/job/job.repository');

const {
  APPLICATION_STATUS
} = require('./job-application.constants');

const {
  JOB_APPLICATION_MESSAGES
} = require('./job-application.constants');

const {
  isValidStatusTransition
} = require('./job-application.validators');

const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');


class JobApplicationService {
  async applyToJob(jobSeekerUuid, jobUuid, payload) {
    const jobSeeker =
      await jobApplicationRepository.findJobSeekerByUuid(jobSeekerUuid);

    if (!jobSeeker) {
      throw new AppException(
        JOB_APPLICATION_MESSAGES.NOT_AUTHORIZED,
        HTTP_STATUS.FORBIDDEN
      );
    }

    const job =
      await jobRepository.findJobByUuid(jobUuid);

    if (!job || job.isDeleted || job.status !== 'OPEN') {
      throw new AppException(
        JOB_APPLICATION_MESSAGES.JOB_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    if (!job.isActive) {
      throw new AppException(
        JOB_APPLICATION_MESSAGES.JOB_CLOSED,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    if (job.employerId === jobSeeker.id) {
      throw new AppException(
        JOB_APPLICATION_MESSAGES.NOT_AUTHORIZED,
        HTTP_STATUS.FORBIDDEN
      );
    }

    const alreadyApplied =
      await jobApplicationRepository.exists(job.id, jobSeeker.id);

    if (alreadyApplied) {
      throw new AppException(
        JOB_APPLICATION_MESSAGES.ALREADY_APPLIED,
        HTTP_STATUS.CONFLICT
      );
    }

    return prisma.$transaction(async (tx) => {
      const application =
        await jobApplicationRepository.createApplication(
          tx,
          {
            jobId: job.id,
            jobSeekerId: jobSeeker.id,
            resumeUrl: payload.resumeUrl,
            coverLetter: payload.coverLetter,
            status: APPLICATION_STATUS.APPLIED
          }
        );

      return jobApplicationRepository.toPublicApplication(application);
    });
  }


  async getMyApplications(jobSeekerUuid, query) {
    const jobSeeker =
      await jobApplicationRepository.findJobSeekerByUuid(jobSeekerUuid);

    if (!jobSeeker) {
      throw new AppException(
        JOB_APPLICATION_MESSAGES.NOT_AUTHORIZED,
        HTTP_STATUS.FORBIDDEN
      );
    }

    return jobApplicationRepository.findByJobSeeker(
      jobSeeker.id,
      query
    );
  }


  async withdrawApplication(jobSeekerUuid, applicationUuid) {
    const jobSeeker =
      await jobApplicationRepository.findJobSeekerByUuid(jobSeekerUuid);

    const application =
      await jobApplicationRepository.findByUuid(applicationUuid);

    if (
      !application ||
      application.jobSeekerId !== jobSeeker.id
    ) {
      throw new AppException(
        JOB_APPLICATION_MESSAGES.NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    if (
      !isValidStatusTransition(
        application.status,
        APPLICATION_STATUS.WITHDRAWN
      )
    ) {
      throw new AppException(
        JOB_APPLICATION_MESSAGES.INVALID_STATUS_TRANSITION,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    return jobApplicationRepository.updateStatus(
      application.id,
      APPLICATION_STATUS.WITHDRAWN
    );
  }


  async getApplicationsForJob(employerUuid, jobUuid, query) {
    const employer =
      await jobApplicationRepository.findEmployerByUuid(employerUuid);

    const job =
      await jobRepository.findJobByUuid(jobUuid);

    if (!job || job.employerId !== employer.id) {
      throw new AppException(
        JOB_APPLICATION_MESSAGES.NOT_AUTHORIZED,
        HTTP_STATUS.FORBIDDEN
      );
    }

    return jobApplicationRepository.findByJob(
      job.id,
      query
    );
  }


  
  async updateApplicationStatus(
    employerUuid,
    applicationUuid,
    nextStatus
  ) {
    const employer =
      await jobApplicationRepository.findEmployerByUuid(employerUuid);

    const application =
      await jobApplicationRepository.findByUuid(applicationUuid);

    if (!application) {
      throw new AppException(
        JOB_APPLICATION_MESSAGES.NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const job =
      await jobRepository.findJobByUuid(application.jobUuid);

    if (!job || job.employerId !== employer.id) {
      throw new AppException(
        JOB_APPLICATION_MESSAGES.NOT_AUTHORIZED,
        HTTP_STATUS.FORBIDDEN
      );
    }

    if (
      !isValidStatusTransition(
        application.status,
        nextStatus
      )
    ) {
      throw new AppException(
        JOB_APPLICATION_MESSAGES.INVALID_STATUS_TRANSITION,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    return jobApplicationRepository.updateStatus(
      application.id,
      nextStatus
    );
  }
}

module.exports = new JobApplicationService();
