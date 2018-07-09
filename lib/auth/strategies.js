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
// note: we need the session strategy with cookie scheme to validate the JWT recieved from Google with server side authentication with Google.
// When using client side Google Auth, we'll probably use the same scheme to validate the JWT received from the client after the client initially authenticates with Google.
// After the JWT has been authenticated with Google and returns with a positive result, create a new JWT and send that back to the client. That way, we don't have to validate the JWT with Google everytime the client makes a request.
// Required: hapi-auth-jwt scheme and a strategy to go with it.