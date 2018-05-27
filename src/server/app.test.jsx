import React from 'react';
import { renderToNodeStream, renderToStaticMarkup } from 'react-dom/server';
import App from '../app/app';
import endpoints from './endpoints';
import initialAppStateMiddleware from './middleware/initial-app-state-middleware';
import { serializeState } from '../utils/state-utils';
import Html from './views/html';
import { PageContext } from '../app/contexts/page-context/page-context';

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
      const initialState = serializeState(req.initialAppState);
      const bridge = PageContext.bridge({ request: req, response: res });

      bridge.head(...styles.map(style => <link rel="stylesheet" type="text/css" href={style} key={style} />));
      bridge.body(
        <script type="text/javascript" dangerouslySetInnerHTML={ { __html: `window.__state__='${initialState}';` } } />,
        ...[...scripts, ...chunks].map(script => <script type="text/javascript" src={script} key={script} />),
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
    },
  );
};
