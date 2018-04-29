const ReactSixteenAdapter = require('enzyme-adapter-react-16');
const { configure } = require('enzyme');

// jest globals
global.requestAnimationFrame = f => setImmediate(f);

configure({ adapter: new ReactSixteenAdapter() });
