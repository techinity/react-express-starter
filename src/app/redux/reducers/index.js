import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import uiReducer from './ui/ui-reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  ui: uiReducer,
});

export default rootReducer;
