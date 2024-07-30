const { Tenant } = require('./models');

const resolvers = {
  Query: {
    tenants: async () => {
      try {
        return await Tenant.findAll();
      } catch (error) {
        throw new Error('Error fetching tenants: ' + error.message);
      }
    },
    tenant: async (_, { tenant_id }) => {
      try {
        return await Tenant.findByPk(tenant_id);
      } catch (error) {
        throw new Error('Error fetching tenant: ' + error.message);
      }
    },
  },

  Mutation: {
    addTenant: async (_, { tenant_name, subscription_plan }) => {
      try {
        const tenant = await Tenant.create({ tenant_name, subscription_plan });
        return tenant;
      } catch (error) {
        throw new Error('Error adding tenant: ' + error.message);
      }
    },
    updateTenant: async (_, { tenant_id, tenant_name, subscription_plan }) => {
      try {
        const tenant = await Tenant.findByPk(tenant_id);
        if (!tenant) {
          throw new Error('Tenant not found');
        }
        tenant.tenant_name = tenant_name || tenant.tenant_name;
        tenant.subscription_plan = subscription_plan || tenant.subscription_plan;
        await tenant.save();
        return tenant;
      } catch (error) {
        throw new Error('Error updating tenant: ' + error.message);
      }
    },
    deleteTenant: async (_, { tenant_id }) => {
      try {
        const tenant = await Tenant.findByPk(tenant_id);
        if (!tenant) {
          throw new Error('Tenant not found');
        }
        await tenant.destroy();
        return `Tenant with ID ${tenant_id} deleted.`;
      } catch (error) {
        throw new Error('Error deleting tenant: ' + error.message);
      }
    },
  },
};

module.exports = { resolvers };
