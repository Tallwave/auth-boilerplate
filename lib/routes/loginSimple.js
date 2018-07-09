'use strict';
const Boom = require('boom');
const mockedUsers = require('../../utils/mockUserDatabase');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        console.log('In handler for loginWithEmail, req.payload.username:', req.payload.username);
        console.log('In handler for loginWithEmail, req.payload.password:', req.payload.password);
        const existingUser = mockedUsers.find((user) => user.username === req.payload.username);
        const userHasPassword = existingUser.password && existingUser.password !== ''; // returns true or false
        const passwordsMatch = await bcrypt.compare(req.payload.password, existingUser.password);
        console.log('existingUser', existingUser)
        console.log('userHasPassword', userHasPassword)
        console.log('passwordsMatch', passwordsMatch)
        if (!existingUser || !userHasPassword || !passwordsMatch) {
          return Boom.unauthorized('Username or passwords do not match');
        }
        // create a JWT token for the cookie
        const userJWTtoken = jwt.sign({
          username: existingUser.username,
          password: existingUser.password,
        }, process.env.AUTH_COOKIE_PASSWORD); // this I can actually send back as a header with a response of 'successful';
        // add profile details to the coookie
        // setting a cookie with the user id and user profile is not ideal. it isn't encoded.
        // In addition, I can send a cookie too.
        req.cookieAuth.set({
          token: userJWTtoken,
          profile: existingUser.name,
        });
        return h.redirect('/restricted'); // for initial testing without client side hoook up
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
