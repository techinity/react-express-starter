import { WINDOW_RESIZE } from '../action-kind';

export const windowResize = () => ({
  type: WINDOW_RESIZE,
  payload: {
    height: window.innerHeight,
    width: window.innerWidth,
  },
});
