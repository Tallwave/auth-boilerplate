'use strict';

module.exports = [{
  method: 'GET',
  path: '/',
  config: {
    auth: false,
    handler(req, h) {
      return h.response('Hi! you are not logged in').type('text/plain');
    },
  },
}, {
  method: 'GET', 
  path: '/restricted', 
  config: { 
    auth: 'jwt',
    handler(req, h) {
      const response = h.response('You used a JWT Token!')
        .type('text/plain')
        .header('Authorization', req.headers.authorization);
      return response;
    },
  },
}, {
  method: 'GET',
  path: '/auth/logout',
  options: {
    auth: false,
    handler(req, h) {
      return h.response('Good bye!')
        .unstate('session');
    },
  },
}];
