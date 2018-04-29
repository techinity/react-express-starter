import initialAppState from '../initial-app-state';
import UiState from '../../../../entities/ui-state';
import { WINDOW_RESIZE } from '../../actions/action-kind';

export default function uiReducer(
  state = initialAppState.ui,
  action,
) {
  if (action.type === WINDOW_RESIZE) {
    return new UiState(state, {
      windowHeight: action.payload.height,
      windowWidth: action.payload.width,
    });
  }

  return state;
}
