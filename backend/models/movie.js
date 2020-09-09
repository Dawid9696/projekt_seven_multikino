/** @format */

const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
	title: {
		type: String,
		trim: true,
		required: true,
		unique: true,
		uppercase: true,
		validate(value) {
			if (validator.isEmpty(value)) throw new Error("Please enter your name !");
		},
	},
	genre: {
		type: String,
		trim: true,
		required: true,
		validate(value) {
			if (validator.isEmpty(value)) throw new Error("Please enter your name !");
		},
	},
	duration: { type: Number, trim: true, require: true, min: 60, max: 180 },
	released: { type: Boolean, default: false },
	direction: { type: String, trim: true, require: true },
	description: { type: String },
	city: [{ type: String }],
	seance: [
		{
			hour: { type: String },
			dimension: { type: String, enum: ["2D", "3D"] },
			dubbing: { type: String, enum: ["Napisy", "Dubbing"] },
		},
	],
	comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("ModelMovie", movieSchema);
