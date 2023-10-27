'use strict';

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
    survey_get_by_key,
    survey_question_answer_post
} = require("../controllers/surveyController");

router
    .route("/:key")
    .get(survey_get_by_key)
    .post(
        body("answers[*].q_id")
            .isNumeric().withMessage('q_id must be a numeric value.'),
        body("answers[*].selected_option")
            .notEmpty().withMessage("Seleced option can't be empty!"),
        survey_question_answer_post
);

// router
//     .route("/getsurvey")
//     .get(
//         body("survey_key")
//             .matches(/^\d{6}$/).withMessage('Key must be a 6 digits number.'),
//         survey_get_by_key)
    
module.exports = router;
