/* eslint-disable no-underscore-dangle */
import React from 'react';
import { hydrate } from 'react-dom';
import App from '../app/app';
import initialAppState from '../app/redux/reducers/initial-app-state';
import './index.scss';
import { deserializeState } from '../utils/state-utils';

const actions = {
  setStatusCode: () => {},
};

const state = {
  ...initialAppState,
  ...deserializeState(window.__state__),
};

delete window.__state__;

document.addEventListener('DOMContentLoaded', () => {
  hydrate(<App url={window.location.href} actions={actions}
              initialAppState={state}/>, document.getElementById('app'));
});
