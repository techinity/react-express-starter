import initialAppState from '../../app/redux/reducers/initial-app-state';

export default function initialAppStateMiddleware(req, res, next) {
  if (/__webpack_hmr|(\.(js|png|svg|ico|map))$/.test(req.url)) { return next(); }

  const state = Object.assign(
    {},
    initialAppState,
  );

  req.initialAppState = state;

  return next();
}
