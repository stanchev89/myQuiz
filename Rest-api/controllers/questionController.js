const { questionModel } = require("../models");
// const { newPost } = require("./postController");

function getAllQuestions(req, res, next) {
	questionModel.find().populate("userId").then((questions) => res.json(questions)).catch(next);
}

function getQuestionsByCategory(req, res, next) {
	const { category } = req.params;
	questionModel.find({category:{'$regex': `${category}`}}).then((questions) => res.json(questions)).catch(next)
}

function addNewQuestion(req, res, next) {
	const newQuestion = req.body;
	questionModel.find({question:newQuestion.question})
		.then(question => {
			if(question.length > 0) {
				return Promise.reject({message:'Question already exist!'})
			}
			questionModel.create(newQuestion)
				.then(() => {
					res.status(200).send({message:'Successful added question!'})
				}).catch(err => {
				if (err.name === "MongoError" && err.code === 11000) {
					let field = err.message.split("index: ")[1];
					field = field.split(" dup key")[0];
					field = field.substring(0, field.lastIndexOf("_"));

					res.status(409).send({ message: `This ${field} is already registered!` });
					return;
				}
				next(err);
			})

		}).catch(next)

}


module.exports = {
	getAllQuestions,
	getQuestionsByCategory,
	addNewQuestion
};