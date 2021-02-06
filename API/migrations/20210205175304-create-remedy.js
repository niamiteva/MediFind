'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Remedies', {
      remedyId: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
        validate: {
            isUUID: 4
        }
      },
      listId: {
        type: Sequelize.UUID,
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
        references: { model: "RemedyList", key: "listId" }
      },
      remedyName: {
        type: Sequelize.STRING
      },
      remedyLink: {
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
    await queryInterface.dropTable('Remedies');
  }
};