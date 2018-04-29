const infoGetEndpoint = require('./info-get-endpoint');

module.exports = (app) => {
  app.use(infoGetEndpoint);
};
