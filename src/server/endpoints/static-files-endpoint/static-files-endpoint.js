const express = require('express');
const path = require('path');

const endpoint = express.Router();
endpoint.use(express.static(path.join(__dirname, '../../../public')));

module.exports = endpoint;
