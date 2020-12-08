const express = require("express");
const router = express.Router();
const { auth, authVip } = require("../utils");
const { questionController } = require("../controllers");

// middleware that is specific to this router

router.get("/", questionController.getAllQuestions);

router.get("/:category", questionController.getQuestionsByCategory);

router.put("/add_new_question", auth(), authVip(), questionController.addNewQuestion);


// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router;