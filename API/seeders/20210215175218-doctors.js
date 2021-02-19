'use strict';
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return db.Doctor.create({
      personalNumber: "7878978980",
      doctorUIN: "100000000", 
      firstName: "Todor",
      lastName: "Todorov",
      email: "todor@medifind.comx",
      isVerified: true,
      password: "8&GgS6pJeBE76!kM",
    })
    .then((data) => console.log(data))
    .catch((err) => console.error(err))
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Doctors', null, {});
  }
};
