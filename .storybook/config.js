import { configure } from '@storybook/react';
import '../src/app/reset.scss';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.jsx?$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
