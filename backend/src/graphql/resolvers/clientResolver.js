const { Client } = require("../../models");

const resolvers = {
  Query: {
    clients: async () => {
      try {
        return await Client.findAll();
      } catch (error) {
        console.error("Error fetching clients:", error);
        throw new Error("Failed to fetch clients");
      }
    },
    client: async (_, { client_id }) => {
      try {
        return await Client.findByPk(client_id);
      } catch (error) {
        console.error("Error fetching client:", error);
        throw new Error("Failed to fetch client");
      }
    },
  },

  Mutation: {
    addClient: async (_, args) => {
      try {
        console.log(args)
        const client = await Client.create(args);
        return client;
      } catch (error) {
        console.error("Error adding client:", error);
        throw new Error("Failed to add client");
      }
    },
    updateClient: async (_, { client_id, ...updates }, { db }) => {
      try {
        const [updated] = await Client.update(updates, {
          where: { client_id },
        });
        if (updated) {
          return await Client.findByPk(client_id);
        }
        throw new Error("Client not found");
      } catch (error) {
        console.error("Error updating client:", error);
        throw new Error("Failed to update client");
      }
    },
    deleteClient: async (_, { client_id }, { db }) => {
      try {
        const deleted = await Client.destroy({
          where: { client_id },
        });
        if (deleted) {
          return "Client deleted successfully";
        }
        throw new Error("Client not found");
      } catch (error) {
        console.error("Error deleting client:", error);
        throw new Error("Failed to delete client");
      }
    },
  },
};

module.exports = { resolvers };
