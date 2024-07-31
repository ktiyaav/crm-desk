const express = require('express');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const { typeDefs } = require('./src/graphql/schema');
const { resolvers } = require('./src/graphql/resolvers');
const { sequelize } = require('./src/models');
const { verifyToken } = require('./src/utils/authUtils')
require('dotenv').config();

const context = ({ req }) => {
  const { query } = req.body;
  
  // regex to identify if query is for login or register
  const regex = new RegExp("^mutation[ ]{0,1}{[ ]{0,1}(login|register).*$");
  const isAuthBypassMutation = query && regex.test(query);
  if (isAuthBypassMutation) {
    return { db: sequelize }; // Bypass authentication for login and register mutations
  }

  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    throw new AuthenticationError('Authentication token missing');
  }

  try {
    // const decoded = verifyToken(token);
    // return { userId: decoded.user_id, db: sequelize };
    return { db: sequelize };
  } catch (error) {
    throw new AuthenticationError('Invalid or expired token');
  }
};

const app = express();
const port = 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
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
