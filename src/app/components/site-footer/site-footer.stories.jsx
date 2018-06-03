import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { withViewport } from '@storybook/addon-viewport/preview';
import { SiteFooter } from './site-footer';

const siteFooterStories = storiesOf('Site Footer', module);

const styleBlock = <style type="text/css">{`
  body {
    background-color: #ccc;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  #container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .content {
    flex: 1 0 auto;
  }
`}
</style>;

siteFooterStories
  .addDecorator(withViewport())
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add('Default footer', () => <React.Fragment>
    {styleBlock}

    <div id="container">
      <div className="content">Footer at the bottom of the page</div>
      <SiteFooter/>
    </div>
  </React.Fragment>);
