/* eslint-disable global-require */
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunkMiddleware from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import appMiddleware from '../middleware';
import history from './history';
import loggerMiddleware from '../middleware/logger-middleware';
import rootReducer from '../reducers';

export default function developmentStore(initialState = {}) {
  const middleware = [
    routerMiddleware(history),

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunkMiddleware,

    ...appMiddleware,

    loggerMiddleware,
  ];

  let devToolsExtensions = f => f;
  if (typeof window !== 'undefined' && 'devToolsExtension' in window) {
    // add support for Redux dev tools
    devToolsExtensions = window.devToolsExtension();
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      devToolsExtensions,
    ),
  );

  if ('hot' in module) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
