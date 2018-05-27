import React from 'react';
import ReactRenderer from 'react-test-renderer';
import { PageContext } from './page-context';

describe('Page Context', () => {
  it('should allow head nodes to be defined in one tree and inserted into another using a bridge between', () => {
    const data = PageContext.bridge();

    ReactRenderer.create(<div>
      <PageContext.Provider value={data}>
        <PageContext.Consumer provider={data}>{(context) => {
          context.head(<meta name="meta-test-node" content="META NODE" />);
        }}</PageContext.Consumer>
      </PageContext.Provider>
    </div>);

    const wrapper = ReactRenderer.create(<html>
      <PageContext.Provider value={data}>
          <head>
            <PageContext.Consumer provider={data}>{context => context.nodes.head}</PageContext.Consumer>
          </head>
      </PageContext.Provider>
    </html>).root;

    expect(wrapper.findByProps({ name: 'meta-test-node' }).props.content).toEqual('META NODE');
  });

  it('should allow body nodes to be defined in one tree and inserted into another using a bridge between', () => {
    const data = PageContext.bridge();

    ReactRenderer.create(<div>
      <PageContext.Provider value={data}>
        <PageContext.Consumer provider={data}>{(context) => {
          context.body(<span className="span-test-node">BODY NODE</span>);
        }}</PageContext.Consumer>
      </PageContext.Provider>
    </div>);

    const wrapper = ReactRenderer.create(<html>
    <PageContext.Provider value={data}>
      <body>
        <PageContext.Consumer provider={data}>{context => context.nodes.body}</PageContext.Consumer>
      </body>
    </PageContext.Provider>
    </html>).root;

    expect(wrapper.findByProps({ className: 'span-test-node' }).props.children).toEqual('BODY NODE');
  });
});
