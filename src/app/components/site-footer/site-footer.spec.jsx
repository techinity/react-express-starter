import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { SiteFooter } from './site-footer';

const renderer = new ReactShallowRenderer();

describe('site-footer component', () => {
  it('should render the component', () => {
    const tree = renderer.render(<SiteFooter />);

    expect(tree).toMatchSnapshot();
  });
});
