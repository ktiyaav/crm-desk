const express = require('express');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const { typeDefs } = require('./src/graphql/schema');
const { resolvers } = require('./src/graphql/resolvers');
const { authMiddleware } = require('./src/middleware/authMiddleware.js');
require('dotenv').config();

const app = express();
const port = 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

async function startServer() {
  try {
    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port }, () =>
      console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
    );
  } catch (err) {
    console.error('Error starting server:', err);
  }
}

startServer();
