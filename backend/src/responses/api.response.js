class ApiResponse {
  constructor({ success = true, message = '', data = null }) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  send(res, statusCode = 200) {
    return res.status(statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data
    });
  }
}

module.exports = { ApiResponse };
