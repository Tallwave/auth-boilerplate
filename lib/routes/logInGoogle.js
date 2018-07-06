'use strict';
const Boom = require('boom');
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
        req.cookieAuth.set({
          token: req.auth.credentials.token,
          profile: req.auth.credentials.profile,
        });
        return h.redirect('/restricted');
      },
    },
  }, {
    method: 'GET',
    path: '/auth/google/logout',
    options: {
      handler(req, h) {
        req.cookieAuth.clear();
        return h.redirect('/');
      },
    },
  },
];
