const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Client {
    client_id: ID!
    tenant_id: ID!
    client_name: String
    contact_info: String
    created_at: String
    updated_at: String
  }

  type Query {
    clients: [Client]
    client(client_id: ID!): Client
  }

  type Mutation {
    addClient(
      tenant_id: ID!
      client_name: String
      contact_info: String
    ): Client
    updateClient(
      client_id: ID!
      client_name: String
      contact_info: String
    ): Client
    deleteClient(client_id: ID!): String
  }
`;

module.exports = { typeDefs };
