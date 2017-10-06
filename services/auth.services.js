/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config/config');

function createToken(user) {
  const payload = {
    sub: user,
    iat: moment().unix(),
    exp: moment().add(1, 'days').unix(),
  };
  return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN);
      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          menssage: 'token  ha expirado',
        });
      }
      resolve(payload.sub);
    } catch (error) {
      reject({
        status: 500,
        menssage: 'invalid token',
      });
    }
  });
  return decoded;
}

module.exports = {
  createToken,
  decodeToken,
};
