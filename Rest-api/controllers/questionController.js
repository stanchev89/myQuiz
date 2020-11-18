const { questionModel } = require("../models");
// const { newPost } = require("./postController");

function getAllQuestions(req, res, next) {
	questionModel.find().populate("userId").then((questions) => res.json(questions)).catch(next);
}

function getQuestion(req, res, next) {
	const { themeId } = req.params;

	themeModel.findById(themeId).populate("users_passed").then((theme) => res.json(theme)).catch(next);
}

// function createTheme(req, res, next) {
// 	const { themeName, postText } = req.body;
// 	const { _id: userId } = req.user;

// 	themeModel
// 		.create({ themeName, userId, subscribers: [ userId ] })
// 		.then((theme) => {
// 			newPost(postText, userId, theme._id).then(([ _, updatedTheme ]) => res.status(200).json(updatedTheme));
// 		})
// 		.catch(next);
// }

function answeredCorrectly(req, res, next) {
	const questionId = req.params.questionId;
	const { _id: userId } = req.user;
	questionModel
		.findByIdAndUpdate({ _id: questionId }, { $addToSet: { users_passed: userId } }, { new: true })
		.then((updatedQuestion) => {
			res.status(200).json(updatedQuestion);
		})
		.catch(next);
}

module.exports = {
	getAllQuestions,
	getQuestion,
	answeredCorrectly
};
