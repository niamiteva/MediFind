'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Remedies',
      'checked',
     Sequelize.BOOLEAN
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Remedies',
      'checked'
    );
  }
};
