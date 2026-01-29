const prisma = require('@/config/prisma');
const jobRepository = require('./job.repository');

const { JOB_STATUS, JOB_MESSAGES } = require('./job.constants');
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const skillService = require('@/modules/skill/skill.service')

class JobService {
  async createJob(employerUuid, payload) {
    const employer = await jobRepository.findEmployerByUserUuid(employerUuid);
    if (!employer) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: JOB_MESSAGES.NOT_AUTHORIZED
      });
    }

    const { skills, ...jobData } = payload;

    return prisma.$transaction(async (tx) => {
      const job = await jobRepository.createJob(tx, employer.id, {
        ...jobData,
        status: JOB_STATUS.OPEN
      });

      const skills = await skillService.resolveSkillIds(tx, skills);
      await jobRepository.attachSkills(tx, job.id, skills);

      return jobRepository.toPublicJob(job);
    });
  }

  async updateJob(employerUuid, jobUuid, payload) {
    const job = await jobRepository.findJobByUuid(jobUuid);

    if (!job || job.isDeleted) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: JOB_MESSAGES.NOT_FOUND
      });
    }

    const employer = await jobRepository.findEmployerByUserUuid(employerUuid);
    if (job.employerId !== employer.id) {
      throw new AppException({
        status: HTTP_STATUS.FORBIDDEN,
        message: JOB_MESSAGES.NOT_AUTHORIZED
      });
    }

    const { skills, ...updateData } = payload;

    return prisma.$transaction(async (tx) => {
      const updatedJob = await jobRepository.updateJob(
        tx,
        job.id,
        updateData
      );

      if (Array.isArray(skills)) {
        const skillIds = await skillService.resolveSkillIds(tx, skills);
        await jobRepository.replaceSkills(tx, job.id, skillIds);
    }

      return jobRepository.toPublicJob(updatedJob);
    });
  }

  async deleteJob(employerUuid, jobUuid) {
    const job = await jobRepository.findJobByUuid(jobUuid);
    if (!job || job.isDeleted) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: JOB_MESSAGES.NOT_FOUND
      });
    }

    const employer = await jobRepository.findEmployerByUserUuid(employerUuid);
    if (job.employerId !== employer.id) {
      throw new AppException({
        status: HTTP_STATUS.FORBIDDEN,
        message: JOB_MESSAGES.NOT_AUTHORIZED
      });
    }

    await jobRepository.softDelete(job.id);
  }

  async getEmployerJobs(employerUuid) {
    const employer = await jobRepository.findEmployerByUserUuid(employerUuid);
    return jobRepository.findJobsByEmployerId(employer.id);
  }

  async getJobs(query) {
    return jobRepository.findPublicJobs(query);
  }

  async getJobByUuid(uuid) {
    const job = await jobRepository.findPublicJobByUuid(uuid);
    if (!job) {
      throw new AppException({
        status: HTTP_STATUS.NOT_FOUND,
        message: JOB_MESSAGES.NOT_FOUND
      });
    }

    return job;
  }
}

module.exports = new JobService();
