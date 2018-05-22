import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Viewport, withViewport } from '@storybook/addon-viewport/preview';
import devices from '../../../../config/supported-devices';
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

devices.forEach(device => siteFooterStories
  .addDecorator(withViewport(device))
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(`Page footer (${device})`, () => <Viewport>
    {styleBlock}

    <div id="container">
      <div className="content">Footer at the bottom of the page</div>
      <SiteFooter />
    </div>
  </Viewport>));
