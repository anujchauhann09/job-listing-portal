const bcrypt = require('bcrypt');
const { BCRYPT_SALT_ROUNDS } = require("../config/security.config");

const hashPassword = async (plainPassword) => {
  return bcrypt.hash(plainPassword, BCRYPT_SALT_ROUNDS);
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword
};
