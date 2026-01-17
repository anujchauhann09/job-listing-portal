const ms = require("ms"); 

const getExpiryDate = (duration) => {
  return new Date(Date.now() + ms(duration));
};

module.exports = { getExpiryDate };
