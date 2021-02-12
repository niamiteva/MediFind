"use strict";
const crypto = require("crypto");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.VerificationToken, {
        as: "verificationtoken",
        foreignKey: "userId",
        foreignKeyConstraint: true,
      });
      User.hasMany(models.RemedyList, {
        as: "remedylist",
        foreignKey: "userId",
      });
    }  

    generateSalt() {
      return crypto.randomBytes(16).toString("base64");
    };
  
    encryptPassword(plainText, salt) {
      return crypto
        .createHash("RSA-SHA256")
        .update(plainText)
        .update(salt)
        .digest("hex");
    };

    authenticate(password) {
      console.log(this.encryptPassword(password, this.salt()) === this.password())
      return (
        this.encryptPassword(password, this.salt()) === this.password()
      );
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
          isUUID: 4,
        },
        get() {
          return this.getDataValue("id").toLowerCase();
        },
      },
      personalNumber: {
        type: DataTypes.STRING,
        validate: {
          isValidNumber() {},
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      password: {
        type: DataTypes.STRING,
        get() {
          return () => this.getDataValue("password");
        },
      },
      salt: {
        type: DataTypes.STRING,
        get() {
          return () => this.getDataValue("salt");
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  const setSaltAndPassword = (user) => {
    if (user.changed("password")) {
      console.log(user.password());
      user.salt = user.generateSalt();
      user.password = user.encryptPassword(
        user.password(),
        user.salt()
      );
    }
  };

  User.beforeCreate(setSaltAndPassword);
  User.beforeUpdate(setSaltAndPassword);

  //!! beforeUpdate hook called when use instance.save() or instance.update(), when use model.update(), beforeBulkUpdate will be called.

  return User;
};
