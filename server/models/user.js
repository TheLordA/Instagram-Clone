const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
	Name: {
		type: String,
		required: true,
	},
	Email: {
		type: String,
		required: true,
	},
	Password: {
		type: String,
		required: true,
	},
	Followers: [{ type: ObjectId, ref: "User" }],
	Following: [{ type: ObjectId, ref: "User" }],
});

mongoose.model("User", userSchema);
