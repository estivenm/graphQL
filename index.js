const express = require('express'),
  bodyParser = require('body-parser'),
  { graphqlExpress, graphiqlExpress } = require('graphql-server-express'),
  schema = require('./schema/schema.graphql')

const app = express();

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use('/graphql', graphqlExpress({ schema }))
  .use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))



  
app.listen(3000, () => {
  console.log(`app corriendo correctamente`);
})