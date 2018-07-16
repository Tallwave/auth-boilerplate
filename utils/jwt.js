const jwt = require('jsonwebtoken');

const setJWTAndRespond = (user, h, url) => {
  console.log('in setJWTAndRespond', url)
  const userJWTtoken = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),// setting expiration as 1 day
    id: user.id,
    username: user.username,
  }, process.env.JWT_PASSWORD);

  const response = h.response({ token: userJWTtoken })
    .state('session', userJWTtoken)
    .header('Authorization', `jwt ${userJWTtoken}`)
    .header('Access-Control-Allow-Credentials', true);
  if (url && url !== '') {
    response.redirect(url);
  }
  return response;
};

module.exports = setJWTAndRespond;
