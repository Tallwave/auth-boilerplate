const jwt = require('jsonwebtoken');

const signJWT = (user) => {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),// setting expiration as 1 day
    id: user.id,
    username: user.username,
  }, process.env.JWT_PASSWORD);
};

const setJWTAndRespond = (user, h, url) => {
  const jwtToken = signJWT(user);
  const response = h.response({ token: jwtToken })
    .state('session', jwtToken)
    .header('Authorization', `jwt ${jwtToken}`)
    .header('Access-Control-Allow-Credentials', true);
  if (url && url !== '') {
    response.redirect(url);
  }
  return response;
};
const setJWTAndRespondNoRedirect = (user, h) => {
  const userJWTtoken = signJWT(user);
  const response = h.response({ token: userJWTtoken })
    .state('session', userJWTtoken)
    .header('Authorization', `jwt ${userJWTtoken}`)
    .header('Access-Control-Allow-Credentials', true);
  return response;
};

module.exports = [{ setJWTAndRespond, setJWTAndRespondNoRedirect }];
