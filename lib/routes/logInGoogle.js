'use strict';
const Boom = require('boom');
const setJWTAndRespond = require('../../utils/jwt');
const mockedUsers = require('../../utils/mockUserDatabase');

const validateEmail = (email) => {
  // Example to match all @tallwave.com emails.
  const pattern1 = /^.+@tallwave\.com$/;
  const pattern2 = /^.+@gmail\.com$/;
  const matchTallwave = email.match(pattern1);
  const matchGmail = email.match(pattern2);
  return matchTallwave || matchGmail;
  // uncomment the line below if you do not want to use a validation (not recommended).
  // return email !== null;
};
// to test this, we need to stub out the req.auth object.
// https://stackoverflow.com/questions/31955613/hapijs-lab-test-a-route-with-a-valid-session
module.exports = [
  {
    method: ['GET', 'POST'],
    path: '/auth/google',
    options: {
      auth: 'google',
      async handler(req, h) {
        if (!req.auth.isAuthenticated) {
          return `Authentication failed due to: ${req.auth.error.message}`;
        }
        const email = req.auth.credentials.profile.email;
        if (!validateEmail(email)) {
          return Boom.unauthorized('The email address is not allowed');
        }
        let user = mockedUsers.find((existingUser) => existingUser.username === email);
        if (!user) {
          user = {
            username: email,
            password: null,
            name: 'New User',
            id: Math.random(),
          };
          mockedUsers.push(user);
        }
        
        return setJWTAndRespond(user, h);
      },
    },
  },
];
