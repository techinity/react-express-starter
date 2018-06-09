import { LOCATION_CHANGE } from 'react-router-redux';
import initialAppState from '../initial-app-state';

let isInitialRender = true;

export default function serverReducer(
  state = initialAppState().server,
  action,
) {
  if (action.type === LOCATION_CHANGE) {
    const { pathname } = action.payload;
    isInitialRender = isInitialRender && pathname === state.renderPath;

    return {
      ...state,
      error: isInitialRender ? state.error : null,
    };
  }

  return state;
}
