module.exports = [
  {
    name: 'session',
    options: {
      ttl: 24 * 60 * 60 * 1000,// One day
      isSecure: process.env.NODE_ENV === 'production',
      isHttpOnly: false,
      isSameSite: false,
      path: '/',
      domain: 'localhost',
      encoding: 'none',
    },
  },
];
