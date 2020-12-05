const mongoose = require("mongoose");
const types = mongoose.Schema.Types;

const questionSchema = new mongoose.Schema(
	{
		category: {
			type: types.String,
			required: true
		},
		type: types.String,

		difficulty: types.String,
		question: {
			type: types.String,
			required: true
		},
		correct_answer: {
			type: types.String,
			required: true
		},
		incorrect_answers: {
			type: [ types.String ],
			required: true
		}
	},
	{ timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("question", questionSchema);