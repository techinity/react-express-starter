import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, StaticRouter, Switch } from 'react-router-dom';
import pages from './pages/index';
import reduxStore from './redux/stores/redux-store';
import history from './redux/stores/history';
import { isBrowser } from '../utils/environment-utils';

const Router = isBrowser() ? ConnectedRouter : StaticRouter;

const { ErrorPage } = pages;

const App = ({ url, initialAppState, actions = {} }) => {
  const context = { router: { history: {} }, context: {} };
  const props = {
    location: url,
    context,
  };

  if (isBrowser()) {
    props.history = history;
  }

  const store = reduxStore(initialAppState);

  return (<Provider store={store}>
    <Router {...props}>
      <Switch>
        <Route exact path="/" component={pages.HomePage}/>
        <Route render={() => {
          actions.setStatusCode(404);
          return <ErrorPage />;
        }}/>
      </Switch>
    </Router>
  </Provider>);
};

App.propTypes = {
  actions: PropTypes.object.isRequired,
  initialAppState: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};

export default App;
