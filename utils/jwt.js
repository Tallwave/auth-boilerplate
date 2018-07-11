const jwt = require('jsonwebtoken'); // used to create the JWT,

const setJWTAndRespond = (user, h, url = '/restricted') => {
// Create the JWT
  const userJWTtoken = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),// setting expiration as 1 hour
    id: user.id,
    username: user.username,
  }, process.env.JWT_PASSWORD);

  return h.response({ token: userJWTtoken })
    .state('session', userJWTtoken) // set the cookie
    .header('Authorization', `jwt ${userJWTtoken}`) // set the header
    .redirect(url);
};

module.exports = setJWTAndRespond;
