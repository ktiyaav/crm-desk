const { resolvers: tenantResolvers } = require('./tenantResolver');
const { resolvers: userResolvers } = require('./userResolver');
const { resolvers: clientResolver } = require('./clientResolver');
// Import other resolvers as needed

const resolvers = {
  Query: {
    ...tenantResolvers.Query,
    ...userResolvers.Query,
    ...clientResolver.Query
    // Merge other resolvers' queries here
  },
  Mutation: {
    ...tenantResolvers.Mutation,
    ...userResolvers.Mutation,
    ...clientResolver.Mutation
    // Merge other resolvers' mutations here
  },
};

module.exports = { resolvers };