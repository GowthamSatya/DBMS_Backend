const dbConfig = require("../config/db.config.js");

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
});

sequelize.authenticate();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.lands = sequelize.define("lands", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
	},
	test_data: {
		type: Sequelize.STRING,
	},
});

module.exports = db;
