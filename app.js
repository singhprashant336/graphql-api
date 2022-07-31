const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();
app.use(bodyParser.json());

app.use(isAuth);
app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);
const uri = "mongodb+srv://MyProject:MyProject@cluster0.n7paa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(
    uri
  )
  .then(() => {
    app.listen(3002);
  })
  .catch(err => {
    console.log(err);
  });