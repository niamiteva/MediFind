"use strict"
const crypto = require('crypto');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.VerificationToken, {
        as: 'verificationtoken',
        foreignKey: 'userId',
        foreignKeyConstraint: true,
      });
    }
    

    generateSalt = function() {
      return crypto.randomBytes(16).toString('base64')
    }
    
    encryptPassword = function(plainText, salt) {
      return crypto
          .createHash('RSA-SHA256')
          .update(plainText)
          .update(salt)
          .digest('hex')
    }

    authenticate(password){
      return this.encryptPassword(password, this.passwordSalt()) === this.passwordHash();
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
    },
    isVerified: {
      type: Sequelize.BOOLEAN
    },
    passwordHash: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      get() {
        return () => this.getDataValue('passwordHash')
      }
    },
    passwordSalt: {
      type: DataTypes.STRING,
      get() {
        return() => this.getDataValue('passwordSalt')
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  const setSaltAndPassword = user => {
    if (user.changed('passwordHash')) {
        user.passworSalt = User.generateSalt()
        user.passwordHash = User.encryptPassword(user.passwordHash(), user.passwordSalt())
    }
  }

  User.beforeCreate(setSaltAndPassword)
  User.beforeUpdate(setSaltAndPassword)

  return User;
};