const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./src/graphql/schema');
const { resolvers } = require('./src/graphql/resolvers');
const { sequelize } = require('./src/models');
// const authenticate = require('./src/middlewares/authMiddleware');
// const roleMiddleware = require('./src/middlewares/roleMiddleware');
// const authController = require('./src/controllers/authController');
sequelize.sync({ alter: true }) // Use with caution in production
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database:', err));
  
const app = express();
const port = 4000;

// Middleware to handle JSON requests
// app.use(express.json());

// Public route for login
// app.post('/login', authController.login);
// app.use(authenticate);
// app.use(roleMiddleware(['admin', 'user'])); // Example usage for a route that requires admin or user role

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
