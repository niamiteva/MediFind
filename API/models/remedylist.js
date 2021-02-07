"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RemedyList extends Model {
    static associate(models) {
      RemedyList.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
        foreignKeyConstraint: true,
      });
      RemedyList.hasMany(models.Remedy, {
        as: "remedy",
        foreignKey: "listId",
      });
    }
  }
  RemedyList.init(
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
      listName: DataTypes.STRING,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "RemedyList",
    }
  );
  return RemedyList;
};
