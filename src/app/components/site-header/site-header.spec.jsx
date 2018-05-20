import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { SiteHeader } from './site-header';

const renderer = new ReactShallowRenderer();

describe('SiteHeader component', () => {
  it('should render the component', () => {
    const actions = {};

    const tree = renderer.render(<SiteHeader actions={actions}/>);

    expect(tree).toMatchSnapshot();
  });
});
