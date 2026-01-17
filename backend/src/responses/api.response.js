class ApiResponse {
  constructor({ status, message, data = null }) {
    this.success = status >= 200 && status < 300;
    this.message = message;
    this.data = data;
  }

  send(res, status) {
    return res.status(status).json(this);
  }
}

module.exports = ApiResponse;
