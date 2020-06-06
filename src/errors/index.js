module.exports = {
  // not found
  NotFound(req, res) {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  },

  // catch all
  CatchAll(error, req, res, next) {
    res.status(error.status || 500);
    res.json({ error: error.message });
  },
};
