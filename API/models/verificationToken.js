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
      tokenId: DataTypes.UUID,
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
