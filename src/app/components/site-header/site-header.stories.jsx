import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Viewport, withViewport } from '@storybook/addon-viewport/preview';
import { SiteHeader } from './site-header';
import devices from '../../../../config/supported-devices';

const siteHeaderStories = storiesOf('Site Header', module);

devices.forEach(device => siteHeaderStories
  .addDecorator(withViewport(device))
  .addDecorator(story => <MemoryRouter>
    {story()}
  </MemoryRouter>)
  .add(`${device}`, () => {
    const containerStyle = {
      minHeight: '200vh',
      display: 'block',
    };

    return <Viewport>
      <style type="text/css">{`
          body {
            background-color: #ccc;
        `}</style>

      <div style={containerStyle} id="container">
        <SiteHeader actions={{}}/>
      </div>
    </Viewport>;
  }));
