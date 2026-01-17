const formatErrorForLog = (err) => {
  if (err?.name === 'ZodError') {
    return err?.issues?.map(i => i.message).join(', ') || 'Invalid request data';
  }

  if (err.status && err.message) {
    return err.message;
  }

  return err.message || 'Unknown error';
};

module.exports = {
  formatErrorForLog
};
