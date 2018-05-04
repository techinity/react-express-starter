import initialAppState from '../../app/redux/reducers/initial-app-state';

export default function initialAppStateMiddleware(req, res, next) {
  req.initialAppState = { ...initialAppState };

  return next();
}
