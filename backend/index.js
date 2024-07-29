const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const sequelize = require('./db');

const app = express();
const port = 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ db: sequelize }),
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
