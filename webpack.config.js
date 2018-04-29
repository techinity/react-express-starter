require('dotenv').config();

switch ((process.env.NODE_ENV || '').toLowerCase()) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack-production');
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack-development');
}
