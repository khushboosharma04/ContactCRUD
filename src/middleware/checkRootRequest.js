const checkContactsPath = (req, res, next) => {
  if (req.originalUrl === "/contacts/") {
    return res.status(400).json({
      message: `Requests for the ${req.originalUrl} path are not allowed.`,
    });
  }

  next();
};

module.exports = checkContactsPath;
