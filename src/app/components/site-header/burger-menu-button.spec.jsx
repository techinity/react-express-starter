import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import BurgerMenuButton from './burger-menu-button';

const renderer = new ReactShallowRenderer();

describe('burger-menu-button component', () => {
  it('should render the component', () => {
    const tree = renderer.render(<BurgerMenuButton />);

    expect(tree).toMatchSnapshot();
  });

  it('should toggle the state.open property when clicking on the button', () => {
    const wrapper = shallow(<BurgerMenuButton />);
    const controlLabel = wrapper.find('label').first();

    controlLabel.simulate('click', { preventDefault() {} });
    expect(wrapper.state().open).toEqual(true);

    controlLabel.simulate('click', { preventDefault() {} });
    expect(wrapper.state().open).toEqual(false);
  });
});
