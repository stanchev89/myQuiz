const router = require("express").Router();
const users = require("./users");
const questions = require("./questions");
// const likes = require("./likes");
const test = require("./test");

router.use("/users", users);
router.use("/questions", questions);
// router.use("/likes", likes);
router.use("/test", test);

module.exports = router;
