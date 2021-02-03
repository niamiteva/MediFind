"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class VerificationToken extends Model {
    static associate(models) {
      verificationtoken.belongsTo(models.User, {
				as: "user",
				foreignKey: "userId",
				foreignKeyConstraint: true
			});
    }
  }
  VerificationToken.init(
    {
      tokenId: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
            isUUID: 4
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
        references: { model: "User", key: "id" }
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "VerificationToken",
    }
  );
  return VerificationToken;
};
