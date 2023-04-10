const db = require("../models");
const Lands = db.lands;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
	if (!req.body.id) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		return;
	}

	// Create a Tutorial
	const land = {
		id: req.body.id,
		test_data: req.body.data,
	};

	// Save Tutorial in the database
	Lands.create(land)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Tutorial.",
			});
		});
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
	const id = req.query.id;
	var condition = id ? { title: { [Op.like]: `%${id}%` } } : null;

	Lands.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving tutorials.",
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;

	Lands.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Land with id=${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error retrieving Land with id=" + id,
			});
		});
};

exports.update = (req, res) => {
	const id = req.params.id;

	Lands.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Tutorial was updated successfully.",
				});
			} else {
				res.send({
					message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error updating Tutorial with id=" + id,
			});
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Lands.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Tutorial was deleted successfully!",
				});
			} else {
				res.send({
					message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Could not delete Tutorial with id=" + id,
			});
		});
};

exports.deleteAll = (req, res) => {
	Lands.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.send({ message: `${nums} Tutorials were deleted successfully!` });
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all tutorials.",
			});
		});
};

exports.findAllPublished = (req, res) => {
	Lands.findAll({ where: { published: true } })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving tutorials.",
			});
		});
};
