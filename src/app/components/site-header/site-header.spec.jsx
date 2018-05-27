import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { SiteHeader } from './site-header';


describe('SiteHeader component', () => {
  const renderer = new ReactShallowRenderer();

  it('should render the component', () => {
    const actions = {};

    const tree = renderer.render(<SiteHeader actions={actions}/>);

    expect(tree).toMatchSnapshot();
  });
});
