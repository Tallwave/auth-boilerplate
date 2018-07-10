'use strict';
const Boom = require('boom');
const mockedUsers = require('../../utils/mockUserDatabase');

module.exports = [
  {
    method: 'GET',
    path: '/auth/simple',
    options: {
      auth: 'simple',
      handler(req, h) {
        if (!req.auth.isAuthenticated) {
          return `Authentication failed due to: ${req.auth.error.message}`;
        }
        const userExists = mockedUsers.find((user) => 
          user.username === req.auth.credentials.userName);
        if (!userExists) {
          return Boom.unauthorized('The user does not exist');
        }
        return h.redirect('/restricted/simpleBasic');
      },
    },
  }, {
    method: 'GET',
    path: '/auth/simple/logout',
    options: {
      auth: false,
      handler(req, h) {
        return h.response('You are now logged out').code(401);   
      },  
    },
  },
];
