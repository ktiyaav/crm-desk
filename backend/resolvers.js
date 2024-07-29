const pool = require('./db');

const resolvers = {
  Query: {
    tenants: async () => {
      try {
        const [rows] = await pool.query('SELECT * FROM Tenants');
        return rows;
      } catch (error) {
        throw new Error('Error fetching tenants: ' + error.message);
      }
    },
    tenant: async (_, { tenant_id }) => {
      try {
        const [rows] = await pool.query('SELECT * FROM Tenants WHERE tenant_id = ?', [tenant_id]);
        return rows[0];
      } catch (error) {
        throw new Error('Error fetching tenant: ' + error.message);
      }
    },
  },

  Mutation: {
    addTenant: async (_, { tenant_name, subscription_plan }) => {
      try {
        const [result] = await pool.query(
          'INSERT INTO Tenants (tenant_name, subscription_plan) VALUES (?, ?)',
          [tenant_name, subscription_plan]
        );
        const [rows] = await pool.query('SELECT * FROM Tenants WHERE tenant_id = ?', [result.insertId]);
        return rows[0];
      } catch (error) {
        throw new Error('Error adding tenant: ' + error.message);
      }
    },
    updateTenant: async (_, { tenant_id, tenant_name, subscription_plan }) => {
      try {
        await pool.query(
          'UPDATE Tenants SET tenant_name = ?, subscription_plan = ? WHERE tenant_id = ?',
          [tenant_name, subscription_plan, tenant_id]
        );
        const [rows] = await pool.query('SELECT * FROM Tenants WHERE tenant_id = ?', [tenant_id]);
        return rows[0];
      } catch (error) {
        throw new Error('Error updating tenant: ' + error.message);
      }
    },
    deleteTenant: async (_, { tenant_id }) => {
      try {
        await pool.query('DELETE FROM Tenants WHERE tenant_id = ?', [tenant_id]);
        return `Tenant with ID ${tenant_id} deleted.`;
      } catch (error) {
        throw new Error('Error deleting tenant: ' + error.message);
      }
    },
  },
};

module.exports = { resolvers };
