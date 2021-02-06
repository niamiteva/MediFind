"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("User", {
      userId: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
        validate: {
          isUUID: 4,
        },
        get() {
          return this.getDataValue("userId").toLowerCase();
        },
      },
      personalNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isValidNumber() {},
        },
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
      },
      passwordHash: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        get() {
          return () => this.getDataValue("passwordHash");
        },
      },
      passwordSalt: {
        type: Sequelize.STRING,
        get() {
          return () => this.getDataValue("passwordSalt");
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
