/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

const services = require('../services/auth.services');

function isAut(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ menssage: 'Not have autorizathion' });
  }
  const token = req.headers.authorization.split(' ')[1];
  // console.log('token en auth:', token);

  services.decodeToken(token)
    .then((response) => {
      // console.log('response es', response)
      req.data = response;
      next();
    })
    .catch((response) => {
      res.status(200).send(response);
    });
}

module.exports = isAut;
