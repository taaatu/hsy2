'use strict';

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
    survey_list_get,
    survey_post,
    survey_delete,
    survey_get_by_id
} = require("../controllers/surveyController");

router
    .route("/")
    .get(survey_list_get)
    .post(
        body("survey_header.u_id")
            .isNumeric().withMessage("User ID must be a number!"),
        body("survey_header.survey_title")
            .notEmpty().withMessage("Survey titel can't be empty!"),
        body("survey_header.start_time")
            .notEmpty().withMessage('Start time is required!')
            .matches(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/).withMessage('Start time must be in DD-MM-YYYY format!'),
        body("survey_header.end_time")
            .notEmpty().withMessage('End time is required!')
            .matches(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/).withMessage('End time must be in DD-MM-YYYY format!'),
        body("survey_header.description")
            .notEmpty().withMessage("Survey description can't be empty!"),
        body("questions[*].question")
            .notEmpty().withMessage("Survey question can't be empty!"),
        body("questions[*].option_1")
            .notEmpty().withMessage("Qestion option_1 can't be empty!"),
        body("questions[*].option_2")
            .notEmpty().withMessage("Qestion option_1 can't be empty!"),
        body("questions[*].option_3")
            .notEmpty().withMessage("Qestion option_1 can't be empty!"),
        survey_post
    );

router
    .route("/surveybyid/:surveyId")
    .get(survey_get_by_id)
    .delete(survey_delete);

module.exports = router;