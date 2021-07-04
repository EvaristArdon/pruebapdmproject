#!/usr/bin/env node

require('dotenv').config({
  path: `./${process.env.NODE_ENV || ''}.env`,
});

/**
 * Module dependencies.
 */

const debug = require('debug')('express:www');
const http = require('http');
const app = require('../app');

const { HTTP_HOST, PORT } = process.env;

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

process.on('uncaughtException', uncaughtException => {

});

process.on('unhandledRejection', reason => {
 
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, HTTP_HOST);
server.on('listening', onListening);
