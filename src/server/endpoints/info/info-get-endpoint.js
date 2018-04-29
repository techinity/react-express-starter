const endpoint = require('express').Router();
const { name, version } = require('../../../../package');

endpoint.get('/info', (req, res) => {
  res.json({
    name,
    version,
  });
});

module.exports = endpoint;
