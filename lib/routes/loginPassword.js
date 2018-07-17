'use strict';
const Boom = require('boom');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const setJWTAndRespond = require('../../utils/jwt');
const mockedUsers = require('../../utils/mockUserDatabase');

const setJWTAndRespondNoRedirect = (user, h) => {
  const userJWTtoken = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),// setting expiration as 1 day
    id: user.id,
    username: user.username,
  }, process.env.JWT_PASSWORD);

  const response = h.response({ token: userJWTtoken })
    .state('session', userJWTtoken)
    .header('Authorization', `jwt ${userJWTtoken}`)
    .header('Access-Control-Allow-Credentials', true);
  return response;
};

module.exports = [
  // {
  //   method: 'POST',
  //   path: '/auth/password',
  //   options: {
  //     auth: false,
  //     validate: {
  //       payload: {
  //         username: Joi.string().required(),
  //         password: Joi.string().required()
  //           .min(3)
  //           .max(50),
  //       },
  //     },
  //     async handler(req, h) {
  //       const redirectUrl = req.state.redirect || null;
  //       const existingUser = mockedUsers.find((user) => user.username === req.payload.username);
  //       const userHasPassword = existingUser.password && existingUser.password !== '';
  //       const passwordsMatch = await bcrypt.compare(req.payload.password, existingUser.password);

  //       if (!existingUser || !userHasPassword || !passwordsMatch) {
  //         return Boom.unauthorized('Username or passwords do not match');
  //       }
  //       return setJWTAndRespond(existingUser, h, redirectUrl);
  //     },
  //   },
  // },
  {
    method: 'POST',
    path: '/auth/password',
    options: {
      auth: false,
      validate: {
        payload: {
          username: Joi.string().required(),
          password: Joi.string().required()
            .min(3)
            .max(50),
        },
      },
      async handler(req, h) {
        const redirectUrl = req.state.redirect || null;
        const existingUser = mockedUsers.find((user) => user.username === req.payload.username);
        const userHasPassword = existingUser.password && existingUser.password !== '';
        const passwordsMatch = await bcrypt.compare(req.payload.password, existingUser.password);

        if (!existingUser || !userHasPassword || !passwordsMatch) {
          return Boom.unauthorized('Username or passwords do not match');
        }
        return setJWTAndRespondNoRedirect(existingUser, h, redirectUrl);
      },
    },
  },
];
