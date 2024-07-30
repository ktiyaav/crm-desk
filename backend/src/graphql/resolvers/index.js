const { resolvers: tenantResolvers } = require('./tenantResolver');
// Import other resolvers as needed

const resolvers = {
  Query: {
    ...tenantResolvers.Query,
    // Merge other resolvers' queries here
  },
  Mutation: {
    ...tenantResolvers.Mutation,
    // Merge other resolvers' mutations here
  },
};

module.exports = { resolvers };