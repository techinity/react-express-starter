import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { ErrorPage } from './error-page';

const renderer = new ReactShallowRenderer();

describe('error-page component', () => {
  it('should render the component', () => {
    const tree = renderer.render(<ErrorPage />);

    expect(tree).toMatchSnapshot();
  });
});
