import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, StaticRouter, Switch } from 'react-router-dom';
import reduxStore from './redux/stores/redux-store';
import history from './redux/stores/history';
import { isBrowser } from '../utils/environment-utils';
import './reset.scss';
import { ErrorPage, HomePage } from '../app/pages';

const Router = isBrowser() ? ConnectedRouter : StaticRouter;

const App = ({
  initialAppState, url,
}) => {
  const context = { router: { history: {} }, context: {} };
  const props = {
    location: url,
    context,
  };

  if (isBrowser()) {
    props.history = history;
  }

  const store = reduxStore(initialAppState);

  const routing = (<Provider store={store}>
    <Router {...props}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={ErrorPage} />;
      </Switch>
    </Router>
  </Provider>);

  return routing;
};

App.propTypes = {
  history: PropTypes.object,
  initialAppState: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};

export default App;
