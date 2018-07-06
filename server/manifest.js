'use strict';

const Dotenv = require('dotenv');
const Confidence = require('confidence');
const Toys = require('toys');

// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` });

// Glue manifest as a confidence store
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
  },
  register: {
    plugins: [
      {
        plugin: 'bell',
      },
      {
        plugin: 'hapi-auth-cookie',
      },
      {
        plugin: 'hapi-auth-basic',
      },
      {
        plugin: '../lib/auth', // auth plugin because the file name is 'index.js' and haute-couture won't automatically register it.
      },
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
