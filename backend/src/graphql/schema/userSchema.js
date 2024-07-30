const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    user_id: ID!
    tenant_id: ID
    client_id: ID
    username: String!
    password: String!
    email: String!
    first_name: String!
    last_name: String!
    phone_number: String
    role: String!
    other_info: String
    created_at: String
    updated_at: String
  }

  type Query {
    users: [User]
    user(user_id: ID!): User
  }

  type Mutation {
    addUser(
      tenant_id: ID
      client_id: ID
      username: String!
      password: String!
      email: String!
      first_name: String!
      last_name: String!
      phone_number: String
      role: String!
      other_info: String
    ): User

    updateUser(
      user_id: ID!
      tenant_id: ID
      client_id: ID
      username: String
      password: String
      email: String
      first_name: String
      last_name: String
      phone_number: String
      role: String
      other_info: String
    ): User

    deleteUser(user_id: ID!): String
  }
`;

module.exports = { typeDefs };
