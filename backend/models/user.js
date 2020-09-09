/** @format */

const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	admin: { type: Boolean, default: false },
	name: {
		type: String,
		required: true,
		trim: true,
		validate(value) {
			console.log(!validator.isEmpty(value));
			if (validator.isEmpty(value)) throw new Error("Please enter your name !");
			if (!validator.isAlpha(value)) throw new Error(`Name: ${value} can not contain numbers !`);
		},
	},
	surname: { type: String, required: true, trim: true, minlength: 1, maxlength: 15 },
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		validate(value) {
			if (validator.isEmpty(value) || !validator.isEmail(value)) {
				throw new Error(`Value ${value} is not an email!`);
			}
		},
	},
	password: { type: String, required: true, trim: true, minlength: 3 },
	photo: {
		type: String,
		trim: true,
		default: "https://www.pngkey.com/png/detail/413-4139797_unknown-person-icon-png-submarine-force-library-and.png",
	},
	phone: {
		type: String,
		trim: true,
		validate(value) {
			if (value.length != 9) throw new Error("Phone must have 9 marks !");
		},
	},
	age: { type: Number, required: true, trim: true, min: 1, max: 110 },
	sex: { type: String, enum: ["MALE", "FAMALE"], trim: true },
	myTickets: { type: Schema.Types.ObjectId, ref: "ModelMovie" },
});

module.exports = mongoose.model("ModelUser", userSchema);
