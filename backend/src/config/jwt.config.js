const JWT_SECRET = process.env.JWT_SECRET;
const AppException = require("../exceptions/app.exception");

if (!JWT_SECRET) {
  throw new AppException({ status: 500, message: "JWT_SECRET is not defined in environment variables" });
}

module.exports = {
  JWT_SECRET,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  JWT_ALGORITHM: process.env.JWT_ALGORITHM || "HS256",
};
