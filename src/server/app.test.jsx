import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../app/app';
import config from '../../config/webpack.common';
import endpoints from './endpoints';
import initialAppStateMiddleware from './middleware/initial-app-state-middleware';
import { serializeState } from '../utils/state-utils';

// no need to include client side scripts
const styles = [];
const scripts = [];
const chunks = [];

module.exports = (app) => {
  app.use(initialAppStateMiddleware);
  endpoints(app);

  // render view for react
  app.get(
    '*',
    (req, res) => {
      const data = {
        app: renderToString(<App url={req.url}
                                 actions={{ setStatusCode: (statusCode) => { res.statusCode = statusCode; } }}
                                 initialAppState={req.initialAppState} />),
        initialState: serializeState(req.initialAppState),
        publicPath: config.output.publicPath,
        scripts: [...scripts, ...chunks],
        styles,
      };
      res.render('index', data);
    },
  );
};
