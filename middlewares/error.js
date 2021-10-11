// hello-msc/middlewares/error.js
module.exports = (err, _req, res, _next) => {
  const bdError = () => {
    if (err.message.includes('Argument passed')) {
    return res.status(422).json({ 
      err: { 
        code: 'invalid_data', 
        message: 'Wrong product ID or invalid quantity', 
      }, 
    });
  }
  };
  if (err.message) bdError();
  res.status(err.number).json(err.error);
};