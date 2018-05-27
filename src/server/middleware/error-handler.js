export default function errorHandler(err, req, res, next) {
  res.statusCode = 500;

  res.render('error', {
    errorCode: 500,
    detail: process.env.NODE_ENV === 'development' ? err.stack : err.message,
  });

  next(err);
}
