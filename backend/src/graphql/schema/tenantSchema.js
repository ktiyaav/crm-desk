const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Tenant {
    tenant_id: ID!
    tenant_name: String!
    subscription_plan: String
    created_at: String
    updated_at: String
  }

  type Query {
    tenants: [Tenant]
    tenant(tenant_id: ID!): Tenant
  }

  type Mutation {
    addTenant(tenant_name: String!, subscription_plan: String): Tenant
    updateTenant(tenant_id: ID!, tenant_name: String, subscription_plan: String): Tenant
    deleteTenant(tenant_id: ID!): String
  }
`;

module.exports = { typeDefs };
