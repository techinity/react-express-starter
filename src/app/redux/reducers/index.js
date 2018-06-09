import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import serverReducer from './server/server-reducer';
import uiReducer from './ui/ui-reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  server: serverReducer,
  ui: uiReducer,
});

export default rootReducer;
