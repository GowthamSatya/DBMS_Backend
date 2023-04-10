module.exports = async (sequelize, Sequelize) => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
	const RealEstateApp = await sequelize.define("test", {
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		test_data: {
			type: Sequelize.STRING,
		},
	});

	console.log("App : ", RealEstateApp);

	return RealEstateApp;
};
