import React from 'react';
import ReactRenderer from 'react-test-renderer';
import { Head } from './head';
import { PageContext } from '../../contexts/page-context/page-context';

describe('head component', () => {
  it('should render the component without the page context', () => {
    const wrapper = ReactRenderer.create(<Head/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render the nodes defined in the page context', () => {
    const data = PageContext.bridge();

    data.head(<meta name="meta-test-node" content="META NODE" />);

    const wrapper = ReactRenderer.create(<div>
      <PageContext.Provider value={data}>
        <Head/>
      </PageContext.Provider>
    </div>).root;

    expect(wrapper.findByProps({ name: 'meta-test-node' }).props.content).toEqual('META NODE');
  });
});
