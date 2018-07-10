'use strict';

module.exports = [{
  method: 'GET',
  path: '/',
  config: {
    auth: false,
    handler(req, h) {
      console.log('req.auth', req.auth);
      return h.response('Hi! you are not logged in').type('text/plain');
    },
  },
}, {
  method: 'GET',
  path: '/restricted/googleBell',
  config: {
    auth: 'session',
    handler(req, h) {
      console.log('req.auth', req.auth);
      return h.response('This is secret! You are logged in').type('text/plain');
    },
  }, 
}, {
  method: 'GET',
  path: '/restricted/simpleBasic',
  config: {
    auth: 'simple',
    handler(req, h) {
      console.log('req.auth', req.auth);
      return h.response('This is secret! You are logged in').type('text/plain');
    },
  }, 
}, {
  method: 'GET', 
  path: '/restricted/jwtJwt', 
  config: { 
    auth: 'jwt',
    handler(req, h) {
      console.log('req.auth', req.auth);
      const response = h.response('You used a JWT Token!')
        .type('text/plain')
        .header('Authorization', req.headers.authorization);
      return response;
    },
  },
}];
// When using JWT, check for the token on the header, as a cookie or as a payload. We don't know where it will be.