const { constants } = require("../constants/constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        error: "Validation Failed",
        message: err.message,
      });
      return;
    case constants.NOT_FOUND:
      res.json({
        error: "Not Found",
        message: err.message,
      });
      return;
    default:
      return;
  }
};

module.exports = errorHandler;
