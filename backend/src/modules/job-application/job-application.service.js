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

    const job = await jobRepository.findJobByUuid(jobUuid);

    if (!job || !job.isActive || job.status !== "OPEN") {
      throw new AppException("Job not available", HTTP_STATUS.BAD_REQUEST);
    }

    let resumeUrl;

    if (payload.resumeUrl) {
      resumeUrl = payload.resumeUrl;
    } else if (jobSeeker.resumeUrl) {
      resumeUrl = jobSeeker.resumeUrl;
    } else {
        throw new AppException({
          status: HTTP_STATUS.BAD_REQUEST,
          message: JOB_APPLICATION_MESSAGES.RESUME_REQUIRED
        });
    }

    const absolutePath = path.join(process.cwd(), resumeUrl);
    if (!fs.existsSync(absolutePath)) {
      throw new AppException({
        status: HTTP_STATUS.BAD_REQUEST,
        message: JOB_APPLICATION_MESSAGES.RESUME_NOT_FOUND
      });
    }

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

  async updateApplicationStatus(userUuid, applicationUuid, nextStatus) {
    const employer =
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
