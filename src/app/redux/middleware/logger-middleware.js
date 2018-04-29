/* eslint-disable no-use-before-define */
const console = typeof window === 'undefined' ? console : window.console;

export default function loggerMiddleware({ getState }) {
  return next =>
    (action) => {
      const prevState = getState();
      const returnValue = next(action);
      const nextState = getState();

      const formattedAction = {
        payload: action.payload,
        type: action.type,
      };

      console.log('%c prev state', 'color: #9E9E9E', prevState);
      console.log('%c action', 'color: #03A9F4', formattedAction);
      console.log('%c next state', 'color: #4CAF50', nextState);

      return returnValue;
    };
}
