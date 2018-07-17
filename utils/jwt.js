const jwt = require('jsonwebtoken');

const setJWTAndRespond = (user, h, url = '/restricted') => {
  const userJWTtoken = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),// setting expiration as 1 day
    id: user.id,
    username: user.username,
  }, process.env.JWT_PASSWORD);

  return h.response({ token: userJWTtoken })
    .state('session', userJWTtoken)
    .header('Authorization', `jwt ${userJWTtoken}`)
    .redirect(url);
};

module.exports = setJWTAndRespond;
