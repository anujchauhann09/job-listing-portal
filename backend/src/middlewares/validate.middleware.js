const AppException = require('../exceptions/app.exception');

const validate = (schema) => (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(
      new AppException(400, 'Request body is required')
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
