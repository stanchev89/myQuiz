const { userModel, tokenBlacklistModel } = require("../models");

const utils = require("../utils");
const { authCookieName } = require("../app-config");

const bsonToJson = (data) => {
	return JSON.parse(JSON.stringify(data));
};
const removePassword = (data) => {
	const { password, __v, ...userData } = data;
	return userData;
};

function register(req, res, next) {
	const { username, password, repeatPassword } = req.body;

	return userModel
		.create({ username, password })
		.then(() => {
			res.status(200).send({message:'Successful registration'});
		})
		.catch((err) => {
			if (err.name === "MongoError" && err.code === 11000) {
				let field = err.message.split("index: ")[1];
				field = field.split(" dup key")[0];
				field = field.substring(0, field.lastIndexOf("_"));

				res.status(409).send({ message: `This ${field} is already registered!` });
				return;
			}
			next(err);
		});
}

function login(req, res, next) {
	const { username, password } = req.body;

	userModel
		.findOne({ username })
		.then((user) => {
			return Promise.all([ user, user ? user.matchPassword(password) : false ]);
		})
		.then(([ user, match ]) => {
			if (!match) {
				res.status(401).send({ message: "Wrong username or password" });
				return;
			}
			user = bsonToJson(user);
			user = removePassword(user);

			const token = utils.jwt.createToken({ id: user._id });

			if (process.env.NODE_ENV === "production") {
				res.cookie(authCookieName, token, { httpOnly: true, sameSite: "none", secure: true });
			} else {
				res.cookie(authCookieName, token, { httpOnly: true });
			}
			res.status(200).send(user);
		})
		.catch(next);
}

function logout(req, res) {
	const token = req.cookies[authCookieName];

	tokenBlacklistModel
		.create({ token })
		.then(() => {
			res.clearCookie(authCookieName).status(200).send({ message: "Logged out!" });
		})
		.catch((err) => res.send(err));
}

function getProfileInfo(req, res, next) {
	const { _id: userId } = req.user;

	userModel
		.findOne({ _id: userId }, { password: 0, __v: 0 }) //finding by Id and returning without password and __v
		.then((user) => {
			res.status(200).json(user);
		})
		.catch(next);
}

function editProfileInfo(req, res, next) {
	const { _id: userId } = req.user;
	const { username, correct_answer, answered_question, is_vip } = req.body;
	const update = {
		$addToSet:{},
		$set:{}
	};
	if(is_vip) {
		update.$set.is_vip = !!is_vip;
	}
	if(username) {
		update.$set.username = username;
	}
	if(correct_answer) {
		update.$addToSet.correct_answers = correct_answer._id;
	}
	if(answered_question) {
		update.$addToSet.answered_questions = answered_question._id;
	}
	userModel.findOneAndUpdate({_id:userId}, update,{new:true})
		.then(user => {
			res.status(200).json(user);
		})
		.catch(next)
	}



module.exports = {
	login,
	register,
	logout,
	getProfileInfo,
	editProfileInfo
};