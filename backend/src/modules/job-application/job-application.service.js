const jobApplicationRepository = require("./job-application.repository");
const jobRepository = require("../job/job.repository");

const { APPLICATION_STATUS } = require("./job-application.constants");
const { isValidStatusTransition } = require("./job-application.validators");
const AppException = require("@/exceptions/app.exception");
const { HTTP_STATUS } = require("@/constants/http-status");
const { JOB_APPLICATION_MESSAGES } = require("./job-application.constants");

class JobApplicationService {
  async applyToJob(userUuid, jobUuid, payload) {
    const jobSeeker =
      await jobApplicationRepository.findJobSeekerByUserUuid(userUuid);

    if (!jobSeeker) {
      throw new AppException({
        status: HTTP_STATUS.FORBIDDEN,
        message: JOB_APPLICATION_MESSAGES.NOT_AUTHORIZED,
      });
    }

    const job = await jobRepository.findJobByUuid(jobUuid);

    if (!job || !job.isActive || job.status !== "OPEN") {
      throw new AppException({
        status: HTTP_STATUS.BAD_REQUEST,
        message: JOB_APPLICATION_MESSAGES.JOB_CLOSED,
      });
    }

    // Duplicate check
    const existing = await jobApplicationRepository.exists(job.id, jobSeeker.id);
    if (existing) {
      throw new AppException({
        status: HTTP_STATUS.CONFLICT,
        message: JOB_APPLICATION_MESSAGES.ALREADY_APPLIED,
      });
    }

    // Resolve resumeUrl: payload > jobSeeker profile
    const resumeUrl = payload.resumeUrl || jobSeeker.resumeUrl || null;

    return jobApplicationRepository.createApplication({
      jobId: job.id,
      jobSeekerId: jobSeeker.id,
      resumeUrl,
      coverLetter: payload.coverLetter,
      status: APPLICATION_STATUS.APPLIED,
    });
  }

  async getMyApplications(userUuid, query) {
    const jobSeeker =
      await jobApplicationRepository.findJobSeekerByUserUuid(userUuid);

    if (!jobSeeker) {
      throw new AppException({
        status: HTTP_STATUS.FORBIDDEN,
        message: JOB_APPLICATION_MESSAGES.NOT_AUTHORIZED,
      });
    }

    return jobApplicationRepository.findByJobSeeker(jobSeeker.id, query);
  }

  async withdrawApplication(userUuid, applicationUuid) {
    const jobSeeker =
      await jobApplicationRepository.findJobSeekerByUserUuid(userUuid);

    if (!jobSeeker) {
      throw new AppException({
        status: HTTP_STATUS.FORBIDDEN,
        message: JOB_APPLICATION_MESSAGES.NOT_AUTHORIZED,
      });
    }

    const application =
      await jobApplicationRepository.findByUuid(applicationUuid);

    if (!application || application.jobSeekerId !== jobSeeker.id) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: JOB_APPLICATION_MESSAGES.NOT_FOUND,
      });
    }

    if (
      !isValidStatusTransition(application.status, APPLICATION_STATUS.WITHDRAWN)
    ) {
      throw new AppException({
        status: HTTP_STATUS.BAD_REQUEST,
        message: JOB_APPLICATION_MESSAGES.INVALID_STATUS_TRANSITION,
      });
    }

    return jobApplicationRepository.updateStatus(
      application.id,
      APPLICATION_STATUS.WITHDRAWN,
    );
  }

  async getApplicationsForJob(userUuid, jobUuid, query) {
    const employer =
      await jobApplicationRepository.findEmployerByUserUuid(userUuid);

    if (!employer) {
      throw new AppException({
        status: HTTP_STATUS.FORBIDDEN,
        message: JOB_APPLICATION_MESSAGES.NOT_AUTHORIZED,
      });
    }

    const job = await jobRepository.findJobByUuid(jobUuid);

    if (!job || job.employerId !== employer.id) {
      throw new AppException({
        status: HTTP_STATUS.FORBIDDEN,
        message: JOB_APPLICATION_MESSAGES.NOT_AUTHORIZED,
      });
    }

    return jobApplicationRepository.findByJob(job.id, query);
  }

  async getApplicantResumeFile(userUuid, applicationUuid) {
    const employer = await jobApplicationRepository.findEmployerByUserUuid(userUuid);
    if (!employer) {
      throw new AppException({
        status: HTTP_STATUS.FORBIDDEN,
        message: JOB_APPLICATION_MESSAGES.NOT_AUTHORIZED,
      });
    }

    const application = await jobApplicationRepository.findByUuid(applicationUuid);
    if (!application) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: JOB_APPLICATION_MESSAGES.NOT_FOUND,
      });
    }

    // Verify this application belongs to a job owned by this employer
    const job = await jobRepository.findJobById(application.jobId);
    if (!job || job.employerId !== employer.id) {
      throw new AppException({
        status: HTTP_STATUS.FORBIDDEN,
        message: JOB_APPLICATION_MESSAGES.NOT_AUTHORIZED,
      });
    }

    if (!application.resumeUrl) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'No resume attached to this application',
      });
    }

    // Strip full URL prefix if stored as http://... — extract relative /uploads/... path
    let relativePath = application.resumeUrl;
    const uploadsIndex = relativePath.indexOf('/uploads/');
    if (uploadsIndex !== -1) relativePath = relativePath.substring(uploadsIndex);

    return {
      filePath: relativePath,
      fileName: relativePath.split('/').pop() || 'resume.pdf',
    };
  }

  async getApplicationById(userUuid, applicationUuid) {
    const employer = await jobApplicationRepository.findEmployerByUserUuid(userUuid);
    if (!employer) {
      throw new AppException({
        status: HTTP_STATUS.FORBIDDEN,
        message: JOB_APPLICATION_MESSAGES.NOT_AUTHORIZED,
      });
    }

    const application = await jobApplicationRepository.findByUuidWithDetails(applicationUuid);
    if (!application) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: JOB_APPLICATION_MESSAGES.NOT_FOUND,
      });
    }

    if (application.job?.employer?.id !== employer.id) {
      throw new AppException({
        status: HTTP_STATUS.FORBIDDEN,
        message: JOB_APPLICATION_MESSAGES.NOT_AUTHORIZED,
      });
    }

    return application;
  }

  async updateApplicationStatus(userUuid, applicationUuid, nextStatus) {    const employer =
      await jobApplicationRepository.findEmployerByUserUuid(userUuid);

    if (!employer) {
      throw new AppException({
        status: HTTP_STATUS.FORBIDDEN,
        message: JOB_APPLICATION_MESSAGES.NOT_AUTHORIZED,
      });
    }

    const application =
      await jobApplicationRepository.findByUuid(applicationUuid);

    if (!application) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: JOB_APPLICATION_MESSAGES.NOT_FOUND,
      });
    }

    const job = await jobRepository.findJobById(application.jobId);

    if (!job || job.employerId !== employer.id) {
      throw new AppException({
        status: HTTP_STATUS.FORBIDDEN,
        message: JOB_APPLICATION_MESSAGES.NOT_AUTHORIZED,
      });
    }

    if (!isValidStatusTransition(application.status, nextStatus)) {
      throw new AppException({
        status: HTTP_STATUS.BAD_REQUEST,
        message: JOB_APPLICATION_MESSAGES.INVALID_STATUS_TRANSITION,
      });
    }

    return jobApplicationRepository.updateStatus(application.id, nextStatus);
  }
}

module.exports = new JobApplicationService();
