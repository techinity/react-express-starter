const infoEndpoint = require('./info');
const staticFilesEndpoint = require('./static-files-endpoint');

module.exports = (app) => {
  // order important
  infoEndpoint(app);
  staticFilesEndpoint(app);
};
