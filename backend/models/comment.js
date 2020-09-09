/** @format */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
	comment: { type: String },
	commentDate: { type: Date, default: Date.now() },
	commentRatio: {
		type: Number,
		min: 0,
		max: 10,
		validate(value) {
			if (value <= 0) throw new Error("Please enter your name !");
		},
	},
	commentedBy: { type: Schema.Types.ObjectId, ref: "ModelUser" },
	inMovie: { type: Schema.Types.ObjectId, ref: "ModelMovie" },
});

module.exports = mongoose.model("ModelComment", commentSchema);
