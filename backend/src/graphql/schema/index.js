const { typeDefs: tenantTypeDefs } = require('./tenantSchema');
const { typeDefs: userTypeDefs } = require('./userSchema');
const { typeDefs: clientTypeDefs } = require('./clientSchema');
// Import other schemas as needed

const typeDefs = [tenantTypeDefs, userTypeDefs, clientTypeDefs /*, other schemas */];

module.exports = { typeDefs };