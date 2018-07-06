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
  options: {
    auth: 'session',
    handler() {
      return 'This is secret! You are logged in';
    },
  },
}];
