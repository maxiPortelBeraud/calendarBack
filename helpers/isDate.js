const moment = require("moment");

const isDate = (value, { req, location, path }) => {
  if (!value) return false;
  
  const isValidDate = moment(value).isValid();
  return isValidDate;
};

module.exports = { isDate };
