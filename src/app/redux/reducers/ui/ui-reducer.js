import initialAppState from '../initial-app-state';
import { WINDOW_RESIZE } from '../../actions/action-kind';

export default function uiReducer(
  state = initialAppState().ui,
  action,
) {
  if (action.type === WINDOW_RESIZE) {
    return {
      ...state,
      windowHeight: action.payload.height,
      windowWidth: action.payload.width,
    };
  }

  return state;
}
