'use strict';

const Dotenv = require('dotenv');
const Confidence = require('confidence');
const Toys = require('toys');

Dotenv.config({ path: `${__dirname}/.env` });

module.exports = new Confidence.Store({
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    debug: {
      $filter: 'NODE_ENV',
      development: {
        log: ['error', 'implementation', 'internal'],
        request: ['error', 'implementation', 'internal'],
      },
    },
    routes: {
      cors: {
        $filter: 'NODE_ENV',
        development: true,
      },
    },
  },
  register: {
    plugins: [
      {
        plugin: '../lib', // Main plugin
        options: {},
      },
      {
        plugin: {
          $filter: 'NODE_ENV',
          $default: 'hpal-debug',
          production: Toys.noop,
        },
      },
    ],
  },
});
