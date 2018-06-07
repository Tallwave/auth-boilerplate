'use strict';

module.exports = [{
  method: 'GET',
  path: '/',
  options: {
    handler() {
      return 'hi';
    },
  },
}, {
  method: 'GET',
  path: '/restricted',
  options: {
    auth: 'session',
    handler() {
      return 'this is secret!';
    },
  },
}];
