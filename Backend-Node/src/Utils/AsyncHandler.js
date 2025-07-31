const AsyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      return res.status(err.statusCode || 500).json({
        message: err.message,
        ...err
      })
    })
  }
};
export { AsyncHandler };
