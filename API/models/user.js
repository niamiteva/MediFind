"use strict"
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }

    authenticate(password){
      return password === this.password;
    }
  };
  User.init({
    userId: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
          isUUID: 4
      },
      get() {
          return this.getDataValue('userId').toLowerCase();
      }
    },
    personalNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isValidNumber() {

        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};