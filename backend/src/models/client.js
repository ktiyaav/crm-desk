'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Client.init({
    client_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tenant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tenants', // Name of the target model
        key: 'tenant_id', // Key in the target model
      },
    },
    client_name: DataTypes.STRING,
    contact_info: DataTypes.TEXT,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'Client',
    timestamps: false,
  });
  Client.associate = (models) => {
    // Define associations here
    Client.belongsTo(models.Tenant, {
      foreignKey: 'tenant_id',
      as: 'tenant', // Alias for the association
    });
  };

  return Client;
};