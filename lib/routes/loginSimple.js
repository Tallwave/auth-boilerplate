'use strict';
const Boom = require('boom');
const mockedUsers = require('../../utils/mockUserDatabase');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // used to create the JWT,


module.exports = [
  {
    method: 'POST',
    path: '/loginWithEmail',
    options: {
      auth: false,
      validate: {
        payload: {
          username: Joi.string().required(),
          password: Joi.string().required()
            .min(6)
            .max(50),
        },
      },
      async handler(req, h) {
        const existingUser = mockedUsers.find((user) => user.username === req.payload.username);
        const userHasPassword = existingUser.password && existingUser.password !== '';
        const passwordsMatch = await bcrypt.compare(req.payload.password, existingUser.password);
        if (!existingUser || !userHasPassword || !passwordsMatch) {
          return Boom.unauthorized('Username or passwords do not match');
        }
        const userJWTtoken = jwt.sign({
          id: existingUser.id,
          username: existingUser.username,
        }, process.env.JWT_SECRET_KEY);
        req.cookieAuth.set({
          token: userJWTtoken,
          profile: existingUser.name,
        });
        return h.redirect('/restricted/withJWT'); // for initial testing without client side hoook up
        // return 'Success!';// the cookie will automatically be sent back
      },
    },
  }, {
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
