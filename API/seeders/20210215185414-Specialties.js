'use strict';
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return db.Specialty.bulkCreate([{
      name: "Дерматология"     
    },{
      name: "Инфекциозни болести"
    },{
      //id: "2cabce61-238f-40f1-bb77-741714492409",
      name:"Ревматология"
    },{
      //id: "f74df0aa-de42-498a-9679-8b28b54ccd6c",
      name:"Урология"
    },{
      //id: "9af104f5-a20e-4147-9d2b-381e727c2ba5",
      name:"Обща медицина"
    },{
      //id: "12c232dd-1b17-4ebf-80c7-bd4e71817f68",
      name:"Общопрактикуващ лекар"
    },{
      //id: "9984cc6e-cbbd-45c0-a9aa-a95d54e61c17",
      name:"Кардиология"
    },{
      //id: "d4a7ac4e-90af-491b-8c0a-dec7f91523c9",
      name:"Педиатрия"
    },{
      //id: "c0789451-fc4f-4255-89d6-40ce2caa9e3f",
      name:"Нефрология"
    },{
      //id: "aca52eb7-cd50-4e1b-8c31-6c0dd56ba8e0",
      name:"Ендокринология"
    },{
      //id: "af9ae33b-d99c-4d84-9896-515826c488f6",
      name:"Акушерство и гинекология"
    },{
      //id: "cfc6b766-433f-4b25-9220-350984886d36",
      name:"Клинична лаборатория"
    },{
      //id: "25e11e8d-0058-4c44-b9a0-a1f4b9714a8b",
      name:"Ортопедия и травматология"
    },{
      //id: "8c917d6b-a34f-4a90-bcef-b96aba770b53",
      name:"УНГ"
    },{
      //id: "cb87e905-d217-4d7d-8fd6-6aa825115e6b",
      name:"Гастроентерология"
    }])
    .catch((err) => console.error(err))
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Doctors', null, {});
  }
};
