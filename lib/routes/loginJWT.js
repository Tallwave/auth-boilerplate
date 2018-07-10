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
          password: Joi.string().required().min(3),
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
        }, process.env.JWT_PASSWORD);
        // set another type of cookie specifically for the jwt, cookie name is jwttoken, containing stingified jwt:userJWTtoken

        // TODO: configure cookies in hc, set a cookie!
        return h.response(`Success, you logged in with a JWT ${userJWTtoken}`).header('Authorization', { jwt: userJWTtoken });
        
        // return h.redirect('/restricted/jwtJwt'); // for initial testing without client side hoook up
        // return 'Success!';// the cookie will automatically be sent back
      },
    },
  },
];
