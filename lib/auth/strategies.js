const Bcrypt = require('bcrypt');
const mockedUsers = require('../../utils/mockUserDatabase');

const validate = async (request, userName, password) => {
  const user = mockedUsers.find((user) => user.username === userName);
  if (!user) {
    return { credentials: null, isValid: false };
  }
  const isValid = await Bcrypt.compare(password, user.password);
  const credentials = { id: user.id, userName: user.username };
  return { isValid, credentials };
};
module.exports = [
  { 
    name: 'google',
    scheme: 'bell',
    options: {
      provider: 'google',
      password: process.env.AUTH_COOKIE_PASSWORD,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      isSecure: process.env.NODE_ENV === 'production',
    },
  }, {
    name: 'session',
    scheme: 'cookie',
    options: {
      password: process.env.AUTH_COOKIE_PASSWORD,
      redirectTo: '/auth/google',
      isSecure: process.env.NODE_ENV === 'production',
    },
  }, {
    name: 'simple',
    scheme: 'basic',
    options: { validate },
  },
];
