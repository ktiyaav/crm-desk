const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Tenant = sequelize.define('Tenant', {
  tenant_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tenant_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subscription_plan: {
    type: DataTypes.STRING,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  timestamps: false, // Disable Sequelize's default timestamps
});

module.exports = Tenant;
