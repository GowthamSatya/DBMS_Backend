module.exports = (app) => {
	const lands = require("../controller/real_estate.controller.js");

	var router = require("express").Router();

	// Create a new Tutorial
	router.post("/", lands.create);

	// Retrieve all Tutorials
	router.get("/", lands.findAll);

	app.use("/api/lands", router);
};
