import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { Header } from './header';

const renderer = new ReactShallowRenderer();

describe('header component', () => {
  it('should render the component', () => {
    const actions = {};

    const tree = renderer.render(<Header actions={actions}/>);

    expect(tree).toMatchSnapshot();
  });
});
