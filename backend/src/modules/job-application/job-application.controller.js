const jobApplicationService = require('./job-application.service');
const {
  applyJobValidator,
  updateApplicationStatusValidator,
  getApplicationsValidator
} = require('./job-application.validators');

const { HTTP_STATUS } = require('@/constants/http-status');
const { ApiResponse } = require('@/responses/api.response');
const { JOB_APPLICATION_MESSAGES } = require('./job-application.constants');

const applyToJob = async (req, res, next) => {
  try {
    const jobUuid = req.params.uuid;        
    const userUuid = req.user.sub;          

    const payload = applyJobValidator.parse(req.body);

    const application =
      await jobApplicationService.applyToJob(
        userUuid,
        jobUuid,
        payload
      );

    return new ApiResponse({
      success: true,
      message: JOB_APPLICATION_MESSAGES.APPLIED,
      data: application
    }).send(res, HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

const getMyApplications = async (req, res, next) => {
  try {
    const userUuid = req.user.sub;
    const query = getApplicationsValidator.parse(req.query);

    const applications =
      await jobApplicationService.getMyApplications(
        userUuid,
        query
      );

    return new ApiResponse({
      success: true,
      message: JOB_APPLICATION_MESSAGES.FETCHED,
      data: applications
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

const withdrawApplication = async (req, res, next) => {
  try {
    const applicationUuid = req.params.uuid;
    const userUuid = req.user.sub;

    await jobApplicationService.withdrawApplication(
      userUuid,
      applicationUuid
    );

    return new ApiResponse({
      success: true,
      message: JOB_APPLICATION_MESSAGES.WITHDRAWN
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

const getApplicationsForJob = async (req, res, next) => {
  try {
    const jobUuid = req.params.uuid;
    const userUuid = req.user.sub;
    const query = getApplicationsValidator.parse(req.query);

    const applications =
      await jobApplicationService.getApplicationsForJob(
        userUuid,
        jobUuid,
        query
      );

    return new ApiResponse({
      success: true,
      message: JOB_APPLICATION_MESSAGES.FETCHED,
      data: applications
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

const updateApplicationStatus = async (req, res, next) => {
  try {
    const applicationUuid = req.params.uuid;
    const userUuid = req.user.sub;

    const payload =
      updateApplicationStatusValidator.parse(req.body);

    const application =
      await jobApplicationService.updateApplicationStatus(
        userUuid,
        applicationUuid,
        payload.status
      );

    return new ApiResponse({
      success: true,
      message: JOB_APPLICATION_MESSAGES.STATUS_UPDATED,
      data: application
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  applyToJob,
  getMyApplications,
  withdrawApplication,
  getApplicationsForJob,
  updateApplicationStatus
};
