'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Doctors',
      'worktime',
     Sequelize.DOUBLE
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Doctors',
      'worktime'
    );
  }
};
