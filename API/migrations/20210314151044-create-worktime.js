'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Worktimes', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
        validate: {
          isUUID: 4,
        },
      },
      doctorId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      from: {
        type: Sequelize.TIME,
        defaultValue: '08:00'
      },
      to: {
        type: Sequelize.TIME,
        defaultValue: '18:00'
      },
      day: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Worktimes');
  }
};