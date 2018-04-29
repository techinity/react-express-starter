import thunkMiddleware from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import appMiddleware from '../middleware';
import history from './history';
import rootReducer from '../reducers';

export default function productionStore(initialState = {}) {
  const middleware = [
    // Add other middleware on this line...
    routerMiddleware(history),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunkMiddleware,

    ...appMiddleware,
  ];

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware)),
  );
}
