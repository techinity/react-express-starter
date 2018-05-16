/* eslint-disable import/no-unresolved */
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../app/app';
import endpoints from './endpoints';
import initialAppStateMiddleware from './middleware/initial-app-state-middleware';
import { serializeState } from '../utils/state-utils';

const isChunk = filename => /^\d+\.[0-9a-z]+\.bundle\.js$/i.test(filename);
const isScript = filename => /\.js$/.test(filename) && !isChunk(filename);

const manifest = require('../../__build__/manifest.json');

const assets = Object.keys(manifest).map(key => manifest[key]);
const styles = assets.filter(filename => /\.css$/.test(filename));
const scripts = assets.filter(isScript);
const chunks = assets.filter(isChunk);

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
        publicPath: '/',
        scripts: [...scripts, ...chunks],
        styles,
      };
      res.render('index', data);
    },
  );
};
