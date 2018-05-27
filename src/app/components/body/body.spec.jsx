import React from 'react';
import ReactRenderer from 'react-test-renderer';
import { Body } from './body';
import { PageContext } from '../../contexts/page-context/page-context';

describe('body component', () => {
  it('should render the component without the page context', () => {
    const wrapper = ReactRenderer.create(<Body/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render the nodes defined in the page context', () => {
    const data = PageContext.bridge();

    data.body(<span className="span-test-node">BODY NODE</span>);

    const wrapper = ReactRenderer.create(<div>
      <PageContext.Provider value={data}>
        <Body/>
      </PageContext.Provider>
    </div>).root;

    expect(wrapper.findByProps({ className: 'span-test-node' }).props.children).toEqual('BODY NODE');
  });
});
