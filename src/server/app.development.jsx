import React from 'react';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import { renderToNodeStream, renderToStaticMarkup } from 'react-dom/server';
import App from '../app/app';
import endpoints from './endpoints';
import initialAppStateMiddleware from './middleware/initial-app-state-middleware';
import Html from './views/html';
import { PageContext } from '../app/contexts/page-context/page-context';
import { serializeState } from '../utils/state-utils';

const config = require('../../webpack.config');

module.exports = (app) => {
  app.use(initialAppStateMiddleware);
  endpoints(app);
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    serverSideRender: true,
  }));

  app.use(webpackHotMiddleware(compiler));

  app.get('*', (req, res, next) => {
    if (/\./i.test(req.url)) {
      return next();
    }

    const isChunk = filename => /^\d+\.([0-9a-z]+\.)?bundle\.js$/i.test(filename);
    const isScript = filename => /\.js$/.test(filename) && !isChunk(filename);

    const assets = Object.keys(res.locals.webpackStats.compilation.assets);
    const styles = assets.filter(filename => /\.css$/.test(filename));
    const scripts = [...assets.filter(isScript), ...assets.filter(isChunk)];

    const bridge = PageContext.bridge({ request: req, response: res });
    const initialState = serializeState(req.initialAppState);

    bridge.head(...styles.map(style => <link rel="stylesheet" type="text/css" href={style} key={style} />));
    bridge.body(
      <script type="text/javascript" dangerouslySetInnerHTML={ { __html: `window.__state__='${initialState}';` } } />,
      ...scripts.map(script => <script type="text/javascript" src={script} key={script} />),
    );

    const markup = renderToStaticMarkup(<PageContext.Provider value={bridge}>
      <App
        url={req.url}
        initialAppState={req.initialAppState}/>
    </PageContext.Provider>);

    res.write('<!DOCTYPE html>\n');
    const stream = renderToNodeStream(<PageContext.Provider value={bridge}>
      <Html {...{ markup }} />
    </PageContext.Provider>);

    stream.pipe(res, { end: false });
    return stream.on('end', () => res.end());
  });
};
