"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Remedy extends Model {
    static associate(models) {
      Remedy.belongsTo(models.RemedyList, {
        as: "remedylist",
        foreignKey: "listId",
        foreignKeyConstraint: true,
      });
    }
  }
  Remedy.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
          isUUID: 4,
        },
      },
      listId: DataTypes.UUID,
      remedyName: DataTypes.STRING,
      remedyLink: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      checked: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "Remedy",
    }
  );
  return Remedy;
};
