
const { sequelize } = require('../models');
const { verifyToken } = require('../utils/authUtils')
const { AuthenticationError } = require('apollo-server-express');
const authMiddleware = ({ req }) => {
    const { query } = req.body;
    // regex to identify if query is for login or register
    const regex = new RegExp("^mutation[ ]{0,1}{[ ]{0,1}(login|register).*$");
    const isAuthBypassMutation = query && regex.test(query);
    if (isAuthBypassMutation) {
      return { db: sequelize }; // Bypass authentication for login and register mutations
    }
  
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
  
    if (!token) {
      throw new AuthenticationError('Authentication token missing');
    }
    try {
      const decoded = verifyToken(token);
      console.log(decoded)
      console.log('hello')
      return { user_id: decoded.user_id, user_role:decoded.role, db: sequelize };
    } catch (error) {
      throw new AuthenticationError('Invalid or expired token');
    }
  };

  module.exports = {authMiddleware}