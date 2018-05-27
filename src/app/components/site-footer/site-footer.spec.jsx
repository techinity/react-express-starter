import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { SiteFooter } from './site-footer';

describe('site-footer component', () => {
  const renderer = new ReactShallowRenderer();

  it('should render the component', () => {
    const tree = renderer.render(<SiteFooter />);

    expect(tree).toMatchSnapshot();
  });
});
