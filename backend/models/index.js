const sequelize = require('../db');
const Tenant = require('./tenant');

// Sync models with the database
sequelize.sync()
  .then(() => console.log('Database & tables created!'))
  .catch(error => console.error('Error syncing database:', error));

module.exports = {
  Tenant,
};
