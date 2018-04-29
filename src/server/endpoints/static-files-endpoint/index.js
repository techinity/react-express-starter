const staticFilesEndpoint = require('./static-files-endpoint');

module.exports = (app) => {
  app.use(staticFilesEndpoint);
};
