const path = require('path');

module.exports = {
  development: {
    username: "mydb",
    password: 12345,
    storage: path.join(__dirname, '../database.sqlite3'),
    host: "localhost",
    port: 3000,
    dialect: "sqlite",
    logging: false
  },
  test: {
    username: "root",
    password: null,
    storage: path.join(__dirname, '../database.sqlite3'),
    host: "localhost",
    dialect: "sqlite",
  },
  production: {
    username: "root",
    password: null,
    storage: path.join(__dirname, '../database.sqlite3'),
    host: "localhost",
    dialect: "sqlite"
  }
}