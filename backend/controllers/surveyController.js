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
    getAllAssignedSurveyByUserId,
    createKeyForAssignedSurvey,
    getAllKeyByAssignedSurveyId,
    getSurveyInfoByAssignedSurveyId,
    getAssignedSurveyInfoByKey,
    insertSurveyQuestionAnswer,
    updateKeyStatus,
    checkKeyStatus,
    getAllAssignedSurveyAnswersByKey
} = require('../models/surveyModel');
const {
    generateSixDigitNumber,
    getCurrentDate,
    isCurrentDateInSurveyDataRange,
    isCurrentDateBeforeSurveyEndDate
} = require('../utils/utils');

const survey_list_get = async (req, res, next) => {
    try {
        const surveys = await getAllSurvey();
        res.json(surveys);
    } catch(error) {
        next(error);
    };
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
    };
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
    };
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
    };
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
    };
};

const assigned_survey_list_get = async (req, res, next) => {
    try {
        const user = await getUserById(req.user.user_id);
        const surveys = await getAllAssignedSurveyByUserId(user);
        res.json(surveys);
    } catch(error) {
        next(error);
    };
};

const survey_get_by_key = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error('survey_get_by_key validation', errors.array());
            const err = httpError(errors.errors[0].msg, 400);
            next(err);
            return;
        }
        const assigned_survey_info = await getAssignedSurveyInfoByKey(req.params.key);

        if (!assigned_survey_info) {
            const err = httpError(`Fail to fetch the survey, because key ${req.params.key} is not valid.`, 400);
            next(err);
            return;
        } else {
            const survey_info = await getSurveyById(assigned_survey_info.s_id);
            const currentDate = getCurrentDate();
            if (isCurrentDateInSurveyDataRange(currentDate, survey_info.start_time, survey_info.end_time)) {
                const survey = await getSurveyById(assigned_survey_info.s_id);
                const survey_questions = await getSurveyQuestionsBySurveyId(assigned_survey_info.s_id)
                survey_questions.length > 0 ? res.json({survey_header: survey, questions: survey_questions}) : res.status(400).json({message: `This survey doen't have any question yet`,status: 400});
            } else {
                throw httpError("Fail to fetch survey, because current data is not in the range between survey start data and survey end data.", 400);
            }
        }
    } catch (error) {
        next(error);
    };
};

const assigned_survey_key_list_get = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error('assigned_survey_key_list_get validation', errors.array());
            const err = httpError(errors.errors[0].msg, 400);
            next(err);
            return;
        }
        const keys = await getAllKeyByAssignedSurveyId(req.body.as_id, req.body.key_status);
        res.json(keys);
    } catch(error) {
        next(error);
    };
};

const assigned_survey_key_post = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error('assigned_survey_key_post validation', errors.array());
            const err = httpError(errors.errors[0].msg, 400);
            next(err);
            return;
        }

        const assigned_survey_info = await getSurveyInfoByAssignedSurveyId(req.body.as_id);
        const survey_info = await getSurveyById(assigned_survey_info.s_id);
        const currentDate = getCurrentDate();

        if (!assigned_survey_info) {
            const err = httpError(`Assigned survey Id ${req.body.as_id} doesn't exist.`, 400);
            next(err);
            return;
        } else {
            if (isCurrentDateBeforeSurveyEndDate(currentDate, survey_info.end_time)) {
                const keys = await getAllKeyByAssignedSurveyId(req.body.as_id,"all");
                let newKey;
                let isUnique;
                do {
                    newKey = generateSixDigitNumber(); 
                    isUnique = true;
                    for (let key of keys) {
                        if (newKey == key.survey_key) {
                            isUnique = false;
                            break;
                        }
                    }
                } while (!isUnique);
                await createKeyForAssignedSurvey(newKey, req.body.as_id);
                res.json({ message: `key ${newKey} has been successfully create for assigned survey ID ${req.body.as_id}`, status: 200 });
            } else {
                throw httpError(`Fail to create key, the deadline of assigned survey with ID ${req.body.as_id} has already passed.`, 400);
            }
        }
    } catch(error) {
        next(error); 
    }
};

const survey_question_answer_post = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error('survey_question_answer_post validation', errors.array());
            const err = httpError(errors.errors[0].msg, 400);
            next(err);
            return;
        };
        const key_status = await checkKeyStatus(req.params.key)
        if (key_status.key_status == "unused") { 
            for (let answer of req.body.answers) {
                await insertSurveyQuestionAnswer(answer,req.params.key);
            };
            const savedAnswers = await getAllAssignedSurveyAnswersByKey(req.params.key);
            if (savedAnswers.length == req.body.answers.length) {
                await updateKeyStatus(req.params.key);
                res.json({ message: `Survey submitted.`, status: 200 });
            }
        } else {
            throw httpError("Fail to submit survey, because this key is no longer valid.", 400);
        }
    } catch (error) {
        next(error);
    };
};

  
module.exports = {
    survey_list_get,
    survey_post,
    survey_delete,
    survey_get_by_id,
    assign_survey_post,
    assigned_survey_list_get,
    assigned_survey_key_list_get,
    assigned_survey_key_post,
    survey_get_by_key,
    survey_question_answer_post
};