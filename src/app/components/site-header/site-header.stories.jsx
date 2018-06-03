import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { withViewport } from '@storybook/addon-viewport/preview';
import { SiteHeader } from './site-header';

const siteHeaderStories = storiesOf('Site Header', module);

siteHeaderStories
  .addDecorator(withViewport())
  .addDecorator(story => <MemoryRouter>
    {story()}
  </MemoryRouter>)
  .add('Default header', () => {
    const containerStyle = {
      minHeight: '200vh',
      display: 'block',
    };

    return <React.Fragment>
      <style type="text/css">{`
          body {
            background-color: #ccc;
        `}</style>

      <div style={containerStyle} id="container">
        <SiteHeader actions={{}}/>
      </div>
    </React.Fragment>;
  });
