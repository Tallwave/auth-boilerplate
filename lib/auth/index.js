const Boom = require('boom');
const Bcrypt = require('bcrypt');
const validateEmail = (email) => {
  // Example to match all @tallwave.com emails.
  // const pattern = /^.+@tallwave\.com$/;
  // return email.match(pattern);
  return email !== null;
};
// for basic-auth
const users = {
  john: {
    username: 'john',
    password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
    name: 'John Doe',
    id: '2133d32a',
  },
};
const validate = async (request, username, password) => {
  const user = users[username];
  if (!user) {
    return { credentials: null, isValid: false };
  }
  const isValid = await Bcrypt.compare(password, user.password);
  const credentials = { id: user.id, name: user.name };
  return { isValid, credentials };
};
const plugin = {
  name: 'auth', // scheme name?
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
    server.auth.strategy('simple', 'basic', { validate });

    server.route([
      // {
      //   method: ['GET', 'POST'],
      //   path: '/auth/google',
      //   options: {
      //     auth: 'google',
      //     async handler(req, h) {
      //       if (!req.auth.isAuthenticated) {
      //         return `Authentication failed due to: ${req.auth.error.message}`;
      //       }
  
      //       const email = req.auth.credentials.profile.email;
      //       if (!validateEmail(email)) {
      //         return Boom.unauthorized('Intelligent error message goes here');
      //       }
  
      //       req.cookieAuth.set({
      //         token: req.auth.credentials.token,
      //         profile: req.auth.credentials.profile,
      //       });
      //       console.log('req.cookieAuth:', req.cookieAuth);
      //       return h.redirect('/restricted');
      //     },
      //   },
      // },
      // {
      //   method: 'GET',
      //   path: '/logout',
      //   options: {
      //     handler(req, h) {
      //       req.cookieAuth.clear();
      //       return h.redirect('/');
      //     },
      //   },
      // },
      {
        method: 'GET',
        path: '/auth/simple',
        options: {
          auth: 'simple',
          handler(req, h) {
            return 'welcome using simple auth!';
          },
        },
      },
    ]);
  },
};

module.exports = plugin;
