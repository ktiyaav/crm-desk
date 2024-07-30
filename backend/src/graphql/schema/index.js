const { typeDefs: tenantTypeDefs } = require('./tenantSchema');
// Import other schemas as needed

const typeDefs = [tenantTypeDefs /*, other schemas */];

module.exports = { typeDefs };