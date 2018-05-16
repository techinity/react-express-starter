require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV === 'development' ? process.env.NODE_ENV : 'production';

switch (process.env.NODE_ENV) {
  case 'production':
    module.exports = require('./config/webpack.production');
    break;
  case 'development':
  default:
    module.exports = require('./config/webpack.development');
}
