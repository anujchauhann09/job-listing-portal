const jobService = require("./job.service");
const {
  createJobValidator,
  updateJobValidator,
  getJobsValidator,
} = require("./job.validators");

const { HTTP_STATUS } = require("@/constants/http-status");
const { ApiResponse } = require("@/responses/api.response");
const { JOB_MESSAGES } = require("./job.constants");

const createJob = async (req, res, next) => {
  try {
    const payload = createJobValidator.parse(req.body);
    const employerUuid = req.user.sub;

    const job = await jobService.createJob(employerUuid, payload);

    return new ApiResponse({
      success: true,
      message: JOB_MESSAGES.CREATED,
      data: job,
    }).send(res, HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const jobUuid = req.params.id;
    const payload = updateJobValidator.parse(req.body);
    const employerUuid = req.user.sub;

    const job = await jobService.updateJob(
      employerUuid,
      jobUuid,
      payload
    );

    return new ApiResponse({
      success: true,
      message: JOB_MESSAGES.UPDATED,
      data: job,
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const jobUuid = req.params.id;
    const employerUuid = req.user.sub;

    await jobService.deleteJob(employerUuid, jobUuid);

    return new ApiResponse({
      success: true,
      message: JOB_MESSAGES.DELETED,
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

const getEmployerJobs = async (req, res, next) => {
  try {
    const employerUuid = req.user.sub;

    const jobs = await jobService.getEmployerJobs(employerUuid);

    return new ApiResponse({
      success: true,
      message: JOB_MESSAGES.FETCHED,
      data: jobs,
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

const getJobs = async (req, res, next) => {
  try {
    const query = getJobsValidator.parse(req.query);

    const jobs = await jobService.getJobs(query);

    return new ApiResponse({
      success: true,
      message: JOB_MESSAGES.FETCHED,
      data: jobs,
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

const getJob = async (req, res, next) => {
  try {
    const { uuid } = req.params;

    const job = await jobService.getJobByUuid(uuid);

    return new ApiResponse({
      success: true,
      message: JOB_MESSAGES.FETCHED,
      data: job,
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getEmployerJobs,
  getJobs,
  getJob,
};
