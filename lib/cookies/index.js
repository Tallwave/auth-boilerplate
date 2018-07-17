module.exports = [
  {
    name: 'session',
    options: {
      ttl: 24 * 60 * 60 * 1000,// One day
      isSecure: process.env.NODE_ENV === 'production',
      path: '/',
      encoding: 'none',
    },
  },
];
