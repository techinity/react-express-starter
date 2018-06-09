/* eslint-disable no-underscore-dangle */
import React from 'react';
import { hydrate } from 'react-dom';
import App from '../app/app';
import initialAppState from '../app/redux/reducers/initial-app-state';
import './index.scss';
import { deserializeState } from '../utils/state-utils';
import { PageContext } from '../app/contexts/page-context/page-context';

const initialState = {
  ...initialAppState(),
  ...deserializeState(window.__state__),
};

delete window.__state__;

const bridge = PageContext.bridge(window);

document.addEventListener('DOMContentLoaded', () => {
  hydrate(
    <PageContext.Provider value={bridge}>
      <App url={window.location.href} initialAppState={initialState}/>
    </PageContext.Provider>,
    document.querySelector('#app'),
  );
});
