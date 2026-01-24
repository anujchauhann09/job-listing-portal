const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { ERROR_MESSAGES } = require('@/constants/error-messages');

const validate = (schema) => (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(
      new AppException({ status: HTTP_STATUS.BAD_REQUEST, message: ERROR_MESSAGES.BAD_REQUEST })
    );
  }

  try {
    req.validatedBody = schema.parse(req.body);
    next();
  } catch (err) {
    next(err); 
  }
};

module.exports = validate;
