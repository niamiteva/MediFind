'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Remedy extends Model {
    static associate(models) {
      RemedyList.belongsTo(models.RemedyList, {
        as: "remedylist",
				foreignKey: "listId",
				foreignKeyConstraint: true
      });
    }
  };
  Remedy.init({
    remedyId: DataTypes.UUID,
    listId: DataTypes.UUID,
    remedyName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Remedy',
  });
  return Remedy;
};