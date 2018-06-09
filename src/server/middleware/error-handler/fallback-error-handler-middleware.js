import { DEVELOPMENT, STORYBOOK } from '../../../types/environment';

const showStackInfo = [DEVELOPMENT, STORYBOOK].indexOf(process.env.NODE_ENV) >= 0;

export default function fallbackErrorHandlerMiddleware(err, req, res, next) {
  if (res.headersSent) {
    res.end();
    return next(err);
  }

  res.statusCode = 500;

  res
    .send(showStackInfo ? err.stack : err.message)
    .end();

  return next(err);
}
