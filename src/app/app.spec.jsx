import React from 'react';
import ReactRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import { StaticRouter } from 'react-router-dom';

describe('app', () => {
  let mockIsBrowser = null;
  let mockIsNode = null;
  let mockHistory = null;
  let mockConnectedRouter = null;

  beforeEach(() => {
    mockIsBrowser = jest.fn();
    mockIsNode = jest.fn();
    mockHistory = jest.fn();
    mockConnectedRouter = StaticRouter;

    jest.mock('react-router-redux', () => ({
      ConnectedRouter: mockConnectedRouter,
    }));

    jest.mock('./redux/stores/redux-store', () => () => ({
      dispatch: () => {},
      getState: () => ({
        ui: {},
      }),
      subscribe: () => {},
    }));

    jest.mock('../utils/environment-utils', () => ({
      isBrowser: mockIsBrowser,
      isNode: mockIsNode,
    }));

    jest.mock('./redux/stores/history', () => ({
      history: mockHistory(),
    }));
  });

  afterEach(() => jest.resetModuleRegistry());

  it('should render the app', () => {
    const App = require('./app').default;
    const props = {
      actions: {},
      initialAppState: {},
      url: '/',
    };

    const wrapper = ReactRenderer.create(<App {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should use browser history when running in a browser', () => {
    mockIsBrowser.mockReturnValue(true);
    mockIsNode.mockReturnValue(false);
    mockHistory.mockReturnValue(createMemoryHistory('/'));

    const App = require('./app').default;
    const props = {
      actions: {},
      initialAppState: {},
      url: '/',
    };

    shallow(<App {...props} />);
    expect(mockIsBrowser).toBeCalled();
    expect(mockHistory).toBeCalled();
  });
});
