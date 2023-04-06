const { Sequelize } = require("sequelize");

// Option 1: Passing a connection URI

// Option 3: Passing parameters separately (other dialects)
const db = new Sequelize("codegig", "postgres", "12345678", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = db;
