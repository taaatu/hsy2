'use strict';
const { httpError } = require('../utils/errors');
const { validationResult } = require('express-validator');
const { getUserById } = require('../models/userModel');
const {
    getAllSurvey,
    insertSurvey,
    deleteSurveyById,
    getSurveyById,
    getSurveyQuestionsBySurveyId,
    insertSurveyQuestionBySurveyId,
    assignSurveyToBuilding,
    getAllAssignedSurveyByUserId
} = require('../models/surveyModel');

const survey_list_get = async (req, res, next) => {
    try {
        const surveys = await getAllSurvey();
        res.json(surveys);
    } catch(error) {
        next(error);
    }
};

const survey_delete = async (req, res, next) => {
    try {
        const survey = await getSurveyById(req.params.surveyId);
        await deleteSurveyById(req.params.surveyId);
        if (!survey) {
            const err = httpError(`Survey not found by id ${req.params.surveyId}`, 404);
            next(err);
            return;
        } else {
            res.json({ message: `Survey deleted: ${req.params.surveyId}`, status: 200 });
        }
    } catch (error) {
        next(error);
    } 
};

const survey_post = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error('survey_post validation', errors.array());
            const err = httpError(errors.errors[0].msg, 400);
            next(err);
            return;
        }
        const id = await insertSurvey(req.body.survey_header);
        if (id) {
            for (let question of req.body.questions) {
                await insertSurveyQuestionBySurveyId(id, question);
            }
        }
        res.json({ survey_id: `${id}`, message: `Survey ${req.body.survey_header.survey_title} added`, status: 200 });
    } catch (error) {
        next(error);
    }
};

const survey_get_by_id = async (req, res, next) => {
    try {
        const survey = await getSurveyById(req.params.surveyId);
        if (!survey) {
            const err = httpError(`Survey not found by id ${req.params.surveyId}`, 404);
            next(err);
            return;
        } else {
            console.log(survey)
            const survey_questions = await getSurveyQuestionsBySurveyId(req.params.surveyId)
            survey_questions.length > 0 ? res.json({survey_header: survey, questions: survey_questions}) : res.status(400).json({message: `This survey doen't have any question yet`,status: 400});
        }
    } catch (error) {
        next(error);
    } 
};

const assign_survey_post = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error('assign_survey_post', errors.array());
            const err = httpError(errors.errors[0].msg, 400);
            next(err);
            return;
        }
        const id = await assignSurveyToBuilding(req.body);
        res.json({ message: `Survey ${req.body.s_id} has been successfully assigned to building ${req.body.b_id}`, status: 200 });
    } catch (error) {
        next(error);
    }
};

const assigned_survey_list_get = async (req, res, next) => {
    try {
        const user = await getUserById(req.user.user_id);
        const surveys = await getAllAssignedSurveyByUserId(user);
        res.json(surveys);
    } catch(error) {
        next(error);
    }
};
  
module.exports = {
    survey_list_get,
    survey_post,
    survey_delete,
    survey_get_by_id,
    assign_survey_post,
    assigned_survey_list_get
};