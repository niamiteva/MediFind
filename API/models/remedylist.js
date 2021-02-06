'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RemedyList extends Model {
    static associate(models) {
      RemedyList.belongsTo(models.User, {
        as: "user",
				foreignKey: "userId",
				foreignKeyConstraint: true
      });
      RemedyList.hasMany(model.Remedy,{
        as: 'remedy',
        foreignKey: 'remedyId'
      })
    }
  };
  RemedyList.init({
    listId: DataTypes.UUID,
    listName: DataTypes.STRING,
    userId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'RemedyList',
  });
  return RemedyList;
};