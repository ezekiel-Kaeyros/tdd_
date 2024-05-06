

var jwt = require('jsonwebtoken');

export const decryptToken = (token: string) => {
  let algorithm = {
    algorithm: 'HS256',
  };
  if (token.length > 2 && token) {
    let decoded = jwt.verify(token, 'tdd_app_token', algorithm);
    return decoded;
  } else return null;
};
