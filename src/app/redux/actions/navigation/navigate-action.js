import { push as navigate } from 'react-router-redux';

export const navigateAction = path => (dispatch) => {
  dispatch(navigate(path));
};
