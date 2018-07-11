'use strict';
const Boom = require('boom');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const setJWTAndRespond = require('../../utils/jwt');
const mockedUsers = require('../../utils/mockUserDatabase');

module.exports = [
  {
    method: 'POST',
    path: '/auth/password',
    options: {
      auth: false,
      validate: {
        payload: {
          username: Joi.string().required(),
          password: Joi.string().required()
            .max(50)
            .min(3),
        },
      },
      async handler(req, h) {
        const existingUser = mockedUsers.find((user) => user.username === req.payload.username);
        const userHasPassword = existingUser.password && existingUser.password !== '';
        const passwordsMatch = await bcrypt.compare(req.payload.password, existingUser.password);

        if (!existingUser || !userHasPassword || !passwordsMatch) {
          return Boom.unauthorized('Username or passwords do not match');
        }
        return setJWTAndRespond(existingUser, h);
      },
    },
  },
];
