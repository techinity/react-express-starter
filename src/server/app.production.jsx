/* eslint-disable import/no-unresolved */
import React from 'react';
import { renderToNodeStream, renderToStaticMarkup } from 'react-dom/server';
import App from '../app/app';
import endpoints from './endpoints';
import { serializeState } from '../utils/state-utils';
import Html from './views/html';
import { PageContext } from '../app/contexts/page-context/page-context';

const isChunk = filename => /^\d+\.[0-9a-z]+\.bundle\.js$/i.test(filename);
const isScript = filename => /\.js$/.test(filename) && !isChunk(filename);

const manifest = require('../../__build__/manifest.json');

const assets = Object.keys(manifest).map(key => manifest[key]);
const styles = assets.filter(filename => /\.css$/.test(filename));
const scripts = assets.filter(isScript);
const chunks = assets.filter(isChunk);

module.exports = (app) => {
  endpoints(app);

  const render = (err, req, res, next) => {
    const initialState = serializeState(res.locals.initialAppState);
    const bridge = PageContext.bridge({ request: req, response: res });

    bridge.head(...styles.map(style => <link rel="stylesheet" type="text/css" href={style} key={style} />));
    bridge.body(
      <script type="text/javascript" dangerouslySetInnerHTML={ { __html: `window.__state__='${initialState}';` } } />,
      ...[...scripts, ...chunks].map(script => <script type="text/javascript" src={script} key={script} />),
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

  const renderHandler = (req, res, next) => render(null, req, res, next);

  const errorRenderHandler = (err, req, res, next) => {
    const { initialAppState } = res.locals;
    initialAppState.server.error = {
      message: err.message,
      stack: null,
    };
    res.statusCode = 500;
    render(err, req, res, next);
  };

  app.get('*', renderHandler);
  app.use(errorRenderHandler);
};
