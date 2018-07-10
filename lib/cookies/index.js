// https://github.com/hapijs/hapi/blob/master/API.md#server.state()
module.exports = [
  {
    name: 'session',
    options: {
      ttl: 24 * 60 * 60 * 1000,// One day
      isSecure: true,
      path: '/',
      encoding: 'base64json',
    },
  },
];
