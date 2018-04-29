require('dotenv').config();

require.extensions['.scss'] = () => {};
require.extensions['.svg'] = () => {};

const Environment = require('../types/environment').default;

process.env.NODE_ENV = process.env.NODE_ENV || Environment.PRODUCTION;

const debug = require('debug')('server');

debug(`Starting server in ${process.env.NODE_ENV} environment...`);

const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const port = app.get('port');

process.on('SIGINT', () => setImmediate(() => process.exit(0)));
process.on('SIGTERM', () => setImmediate(() => process.exit(0)));

/**
 * Handle express server errors
 * @param error
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = `${typeof port === 'string' ? 'Pipe' : 'Port'} ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      process.stderr.write(`${bind} requires elevated privileges\n`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.stderr.write(`${bind} is already in use\n`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const address = server.address();
  const bind = typeof address === 'string'
    ? `pipe ${address}`
    : `port ${address.port}`;
  debug(`Listening on ${bind} - ${process.env.NODE_ENV}`);
}

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
