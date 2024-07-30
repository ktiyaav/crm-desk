"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tenant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tenant.init(
    {
      tenant_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tenant_name: DataTypes.STRING,
      subscription_plan: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: "CURRENT_TIMESTAMP",
      },
    },
    {
      sequelize,
      modelName: "Tenant",
      timestamps: false, // Disable Sequelize's default timestamps
    }
  );
  return Tenant;
};

// Tenant Model Old
// const { DataTypes } = require('sequelize');
// const sequelize = require('../db');

// const Tenant = sequelize.define('Tenant', {
//   tenant_id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   tenant_name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   subscription_plan: {
//     type: DataTypes.STRING,
//   },
//   created_at: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
//   updated_at: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//     onUpdate: DataTypes.NOW,
//   },
// }, {
//   timestamps: false, // Disable Sequelize's default timestamps
// });

// module.exports = Tenant;
