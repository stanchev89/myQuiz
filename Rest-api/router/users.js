const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { auth } = require("../utils");
const validator = require("../validators");

// middleware that is specific to this router

// define the home page route
// router.get('/login', function (req, res) {
//   res.send('login page')
// })

router.post(
	"/register",
	auth(false),
	validator.checkMinLength(5, "username", "password"),
	validator.onlyEnglishAndNumbers("username", "password"),
	validator.checkUsernameExisting,
	validator.handleValidationErrors,
	authController.register
);
router.post(
	"/login",
	validator.checkMinLength(5, "username", "password"),
	validator.onlyEnglishAndNumbers("username", "password"),
	validator.handleValidationErrors,
	authController.login
);
router.post("/logout", authController.logout);

router.get("/profile", auth(), authController.getProfileInfo);
router.put("/profile", auth(),
	authController.editProfileInfo);

router.post('/change_password',
	auth(),
	validator.checkMinLength(5,'oldPassword', 'newPassword'),
	validator.handleValidationErrors,
	authController.changeUserPassword
);



// router.get('/confirm-user', auth(false), authController.confirmUser);
// router.get('/user/:id', authController.getUserInfo);

module.exports = router;