import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import { Layout } from './layout';

const renderer = new ReactShallowRenderer();

describe('Layout component', () => {
  it('should render the component', () => {
    const tree = renderer.render(<Layout />);

    expect(tree).toMatchSnapshot();
  });

  it('should render children passed into the Layout component', () => {
    const enzymeWrapper = shallow(<Layout>
        <h1>HEADING</h1>
        <p>CONTENT</p>
      </Layout>);

    expect(enzymeWrapper.find('h1').text()).toBe('HEADING');
    expect(enzymeWrapper.find('p').text()).toBe('CONTENT');
  });
});
