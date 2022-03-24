const mongoose = require("mongoose");

const heroesSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	power: {
		type: Array,
	},
	color: {
		type: String,
	},
    IsAlive: {
		type: Boolean,
	},
    age: {
		type: Number,
	},
	lastConnection: Date,
	orders: Number,
});

const heroes = mongoose.model("heroes", heroesSchema);

// exporter le modèle
module.exports = heroes;