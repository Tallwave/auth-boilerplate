const jwt = require('jsonwebtoken');

module.exports =
  {
    setJWTAndRespond: (user, h, url) => {
      const jwtToken = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),// setting expiration as 1 day
        id: user.id,
        username: user.username,
      }, process.env.JWT_PASSWORD);
      const response = h.response({ token: jwtToken })
        .state('session', jwtToken)
        .header('Authorization', `jwt ${jwtToken}`)
        .header('Access-Control-Allow-Credentials', true);
      if (url && url !== '') {
        document.cookie = 'help';
        // TODO this isn't happening?
        response.redirect(url);
      }
      return response;
    },
    setJWTAndRespondNoRedirect: (user, h) => {
      const userJWTtoken = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),// setting expiration as 1 day
        id: user.id,
        username: user.username,
      }, process.env.JWT_PASSWORD);
      const response = h.response({ token: userJWTtoken })
        .state('session', userJWTtoken)
        .header('Authorization', `jwt ${userJWTtoken}`)
        .header('Access-Control-Allow-Credentials', true);
      return response;
    },
  };
