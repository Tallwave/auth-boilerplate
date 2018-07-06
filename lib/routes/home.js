'use strict';

module.exports = [{
  method: 'GET',
  path: '/',
  options: {
    handler() {
      return 'Hi! You are not logged in.';
    },
  },
}, {
  method: 'GET',
  path: '/restricted',
  config: {
    auth: {
      strategies: ['session', 'simple'],
    },
    handler(req, h) {
      return 'This is secret! You are logged in';
    },
  },
}];
