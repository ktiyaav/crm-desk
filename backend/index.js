const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const app = express();
const port = 4000;

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  // Start the Apollo Server
  await server.start();

  // Apply the Apollo GraphQL middleware to the Express app
  server.applyMiddleware({ app });

  // Start the Express server
  app.listen({ port }, () =>
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
}

startServer().catch(err => {
  console.error('Error starting server:', err);
});
