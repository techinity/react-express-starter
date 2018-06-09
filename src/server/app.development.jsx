import React from 'react';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import { renderToNodeStream, renderToStaticMarkup } from 'react-dom/server';
import App from '../app/app';
import endpoints from './endpoints';
import Html from './views/html';
import { PageContext } from '../app/contexts/page-context/page-context';
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

  endpoints(app);

  const render = (err, req, res, next) => {
    const isChunk = filename => /^\d+\.([0-9a-z]+\.)?bundle\.js$/i.test(filename);
    const isScript = filename => /\.js$/.test(filename) && !isChunk(filename);

    const assets = (res.locals.webpackStats && Object.keys(res.locals.webpackStats.compilation.assets)) || [];
    const styles = assets.filter(filename => /\.css$/.test(filename));
    const scripts = [...assets.filter(isScript), ...assets.filter(isChunk)];

    const bridge = PageContext.bridge({ request: req, response: res });

    const serialisedState = serializeState(res.locals.initialAppState);

    bridge.head(...styles.map(style => <link rel="stylesheet" type="text/css" href={style} key={style} />));
    bridge.body(
      <script type="text/javascript" dangerouslySetInnerHTML={ { __html: `window.__state__='${serialisedState}';` } } />,
      ...scripts.map(script => <script type="text/javascript" src={script} key={script} />),
    );

    const markup = renderToStaticMarkup(<PageContext.Provider value={bridge}>
      <App
        url={req.url}
        initialAppState={res.locals.initialAppState}/>
    </PageContext.Provider>);

    res.write('<!DOCTYPE html>\n');
    const stream = renderToNodeStream(<PageContext.Provider value={bridge}>
      <Html {...{ markup }} />
    </PageContext.Provider>);

    stream.pipe(res, { end: false });
    return stream.on('end', () => {
      res.end();
      next(err);
    });
  };

  const renderHandler = (req, res, next) => (/\./i.test(req.url) ?
    next() :
    render(null, req, res, next));

  const errorRenderHandler = (err, req, res, next) => {
    const { initialAppState } = res.locals;
    initialAppState.server.error = {
      message: err.message,
      stack: err.stack,
    };
    res.statusCode = 500;
    render(err, req, res, next);
  };

  app.get('*', renderHandler);
  app.use(errorRenderHandler);
};
