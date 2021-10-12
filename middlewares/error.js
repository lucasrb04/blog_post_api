// hello-msc/middlewares/error.js
module.exports = (err, _req, res, _next) => {
  if (err.message) res.status(500).json(err.message);
  res.status(err.number).json(err.error);
};