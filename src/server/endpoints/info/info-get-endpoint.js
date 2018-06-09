const endpoint = require('express').Router();
const { name, version } = require('../../../../package');

endpoint.get('/info', (req, res) => {
  res.json({
    name,
    version,
  })
    .end();
});

module.exports = endpoint;
