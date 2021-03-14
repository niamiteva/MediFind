'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Worktime extends Model {
    static associate(models) {
      Worktime.belongsTo(models.Doctor, {
        as: "doctor",
        foreignKey: "doctorId",
        foreignKeyConstraint: true,
      });
    }
  };
  Worktime.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: 4,
      },
    },
    doctorId: DataTypes.UUID,
    day: DataTypes.STRING,
    from: DataTypes.TIME,
    to: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Worktime',
  });
  return Worktime;
};