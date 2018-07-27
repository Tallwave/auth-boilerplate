const mockedUsers = require('../../utils/mockUserDatabase');
/* eslint no-unused-vars: "warn" */
const mockedJwtValidate = async (decoded, request, h) => {
  const existingUser = mockedUsers.find((user) => user.id === decoded.id);
  if (!existingUser) {
    return { isValid: false, credentials: null };
  } else {
    return { isValid: true, credentials: { id: existingUser.id, username: existingUser.username } };
  }
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
      location: 'https://pscu-sales-demo-auth.herokuapp.com',
    },
  }, {
    name: 'jwt',
    scheme: 'jwt',
    options: {
      key: process.env.JWT_PASSWORD,
      validate: mockedJwtValidate,
      verifyOptions: { algorithms: ['HS256'] },
      cookieKey: 'session', 
    },
  },  
];
