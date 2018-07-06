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
        req.cookieAuth.set({
          token: req.auth.credentials.id,
          profile: req.auth.credentials,
        });
        return h.redirect('/restricted');
      },
    },
  }, {
    method: 'GET',
    path: '/auth/simple/logout',
    /* eslint-disable no-unused-vars */
    handler(req, h) {
      /* eslint-enable no-unused-vars */
      req.cookieAuth.clear();
      return Boom.unauthorized('You are now logged out');   
    },
  },
];
