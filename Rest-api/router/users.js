const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { auth } = require("../utils");
const validator = require("../validators");


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

router.get('/all-users',auth(false),authController.getAllUsers);

router.post('/change_password',
	auth(),
	validator.checkMinLength(5,'oldPassword', 'newPassword'),
	validator.handleValidationErrors,
	authController.changeUserPassword
);


module.exports = router;