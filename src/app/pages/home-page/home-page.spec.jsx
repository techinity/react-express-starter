import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { HomePage } from './home-page';

const renderer = new ReactShallowRenderer();

describe('HomePage component', () => {
  it('should render the component', () => {
    const tree = renderer.render(<HomePage />);

    expect(tree).toMatchSnapshot();
  });
});
