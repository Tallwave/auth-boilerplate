const Boom = require('boom');

const validateEmail = (email) => {
  // Example to match all @tallwave.com emails.
  // const pattern = /^.+@tallwave\.com$/;
  // return email.match(pattern);
  return email !== null;
};

const plugin = {
  name: 'auth',
  register: async (server) => {
    server.auth.strategy('google', 'bell', {
      provider: 'google',
      password: process.env.AUTH_COOKIE_PASSWORD,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      isSecure: process.env.NODE_ENV === 'production',
    });
  
    server.auth.strategy('session', 'cookie', {
      password: process.env.AUTH_COOKIE_PASSWORD,
      redirectTo: '/auth/google',
      isSecure: process.env.NODE_ENV === 'production',
    });

    server.route([
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
              return Boom.unauthorized('Intelligent error message goes here');
            }
  
            req.cookieAuth.set({
              token: req.auth.credentials.token,
              profile: req.auth.credentials.profile,
            });

            return h.redirect('/restricted');
          },
        },
      },
      {
        method: 'GET',
        path: '/logout',
        options: {
          handler(req, h) {
            req.cookieAuth.clear();
            return h.redirect('/');
          },
        },
      },
    ]);
  },
};

module.exports = plugin;
