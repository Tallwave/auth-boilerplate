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
      strategies: ['session'],
    },
    handler() {
      return 'This is secret! You are logged in';
    },
  }, 
}, {
  method: 'GET', 
  path: '/restricted/withJWT', 
  config: { auth: 'jwt' },
  handler(request, reply) {
    reply({ text: 'You used a Token!' })
      .header("Authorization", request.headers.authorization);
  },
}];
// When using JWT, check for the token on the header, as a cookie or as a payload. We don't know where it will be.