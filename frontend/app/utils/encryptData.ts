var jwt = require('jsonwebtoken');

export const encryptData = (data: Object) => {
  let algorithm = {
    algorithm: 'HS256',
  };
  let token = jwt.sign(data, 'hello', algorithm);

  return token;
};
// const isPlainObject = (value: any) => value?.constructor === Object;
