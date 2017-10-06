/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { maskErrors } = require('graphql-errors');
const schema = require('./schema/schema.graphql');

maskErrors(schema);
const app = express();
const services = require('./services/auth.services');
const auth = require('./middleware/auth.middleware');
const config = require('./config/config');
const user = require('./models/usuarios');

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use('/graphql', graphqlExpress({
    schema,
    formatError: error => ({
      mensaje: error.message,
    }),
  }))

  .use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
  .post('/', (req, res) => res.status(200).send(services.createToken(req.body.id)))
  .post('/grap', auth, (req, res) => {
    res.status(200).send({ menssage: 'tienes acceso' });
  })

  .post('/grapInsert', user.create);
app.listen(config.port, () => {
  console.info(`app corriendo correctamente en el puerto ${config.port}`);
});
