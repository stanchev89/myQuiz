const express = require("express");
const router = express.Router();
const { auth } = require("../utils");
const { questionController } = require("../controllers");

// middleware that is specific to this router

router.get("/", questionController.getAllQuestions);

router.get("/:questionId", questionController.getQuestion);

// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router;
