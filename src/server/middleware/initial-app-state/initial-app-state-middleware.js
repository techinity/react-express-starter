import initialAppState from '../../../app/redux/reducers/initial-app-state';

export default function initialAppStateMiddleware(req, res, next) {
  const state = initialAppState();

  state.server.renderPath = req.url;

  res.locals.initialAppState = state;

  return next();
}
