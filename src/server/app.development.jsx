import React from 'react';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import { renderToString } from 'react-dom/server';
import App from '../app/app';
import { serializeState } from '../utils/state-utils';

const config = require('../../webpack.config');

module.exports = (app) => {
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    serverSideRender: true,
  }));

  app.use(webpackHotMiddleware(compiler));

  app.get('*', (req, res, next) => {
    if (/\./i.test(req.url)) { return next(); }

    const isChunk = filename => /^\d+\.([0-9a-z]+\.)?bundle\.js$/i.test(filename);
    const isScript = filename => /\.js$/.test(filename) && !isChunk(filename);

    const assets = Object.keys(res.locals.webpackStats.compilation.assets);
    const styles = assets.filter(filename => /\.css$/.test(filename));
    const scripts = assets.filter(isScript);
    const chunks = assets.filter(isChunk);

    const data = {
      app: renderToString(<App url={req.url}
                               actions={{ setStatusCode: (statusCode) => { res.statusCode = statusCode; } }}
                               initialAppState={req.initialAppState} />),
      initialState: serializeState(req.initialAppState),
      publicPath: config.output.publicPath,
      scripts: [...scripts, ...chunks],
      styles,
    };

    return res.render('index', data);
  });
};
