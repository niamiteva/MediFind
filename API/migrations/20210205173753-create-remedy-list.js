'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RemedyLists', {
      listId: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
        validate: {
            isUUID: 4
        }
      },
      listName: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
        references: { model: "User", key: "userId" }
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
    await queryInterface.dropTable('RemedyLists');
  }
};