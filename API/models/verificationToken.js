"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class VerificationToken extends Model {
    static associate(models) {
      VerificationToken.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
        foreignKeyConstraint: true,
      });
    }
  }
  VerificationToken.init(
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
      userId: DataTypes.UUID,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "VerificationToken",
    }
  );
  return VerificationToken;
};
