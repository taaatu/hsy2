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
    updateSurveyStatus,
    assignSurveyToBuilding,
    getAllAssignedSurveyByUserId,
    createKeyForAssignedSurvey,
    getAllKeyByAssignedSurveyId,
    getSurveyInfoByAssignedSurveyId,
    getAssignedSurveyInfoByKey,
    insertSurveyQuestionAnswer,
    updateKeyStatus,
    checkKeyStatus,
    getAllAssignedSurveyAnswersByKey,
    getSurveyQuestionByQuestionId,
    getAssignedSurveyById,
    deleteAssignedSurveyById,
    getAssigndSurveyIdByKey,
    getAllAssignedSurveyIdBySurveyId,
    getAllPropertyManagerEmail,
    getAssignedSurveyInfoBySurveyKey,
    updateSurveyEndDate
} = require('../models/surveyModel');
const {
    generateSixDigitNumber,
    getCurrentDate,
    isCurrentDateInSurveyDataRange,
    isCurrentDateBeforeSurveyEndDate
} = require('../utils/utils');
const nodemailer = require("nodemailer");

const survey_list_get = async (req, res, next) => {
    try {
        const user = await getUserById(req.user.user_id);
        const surveys = await getAllSurvey(user);
        res.json(surveys);
    } catch(error) {
        next(error);
    };
};

const survey_delete = async (req, res, next) => {
    try {
        const survey = await getSurveyById(req.params.surveyId);
        if (!survey) {
            const err = httpError(`Survey not found by id ${req.params.surveyId}`, 404);
            next(err);
            return;
        } else {
            await deleteSurveyById(req.params.surveyId);
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

            if (req.body.survey_header.survey_status == "published") {        
                const transporter = nodemailer.createTransport({
                    service: process.env.MAILER_PROVIDER,
                    auth: {
                      user: process.env.MAILER_EMAIL,
                      pass: process.env.MAILER_PASSWORD,
                    },
                });
                const property_manager_email_list = [];
                const email_list = await getAllPropertyManagerEmail();
                console.log(email_list)
                for (let email of email_list) {
                    property_manager_email_list.push(email.email)
                }
                console.log(property_manager_email_list)
                await transporter.sendMail({
                    from: `HIMA<${process.env.MAILER_EMAIL}>`, 
                    to: `${property_manager_email_list}`, 
                    subject: "New survey has been published",
                    text: `Hi,\n\nNew survey ${req.body.survey_header.survey_title} has been published. Please check the detail of new survey from Hima application.\n\n Best Regards,\nHSY admin`, 
                });
            }
        }
        
        res.json({ survey_id: `${id}`, message: `Survey ${req.body.survey_header.survey_title} added`, status: 200 });
    } catch (error) {
        next(error);
    };
};

const survey_publish_post = async (req, res, next) => {
    try {
        const result = await updateSurveyStatus(req.body.survey_id);
        if (result) { 
            const transporter = nodemailer.createTransport({
                service: process.env.MAILER_PROVIDER,
                auth: {
                  user: process.env.MAILER_EMAIL,
                  pass: process.env.MAILER_PASSWORD,
                },
            });
            const property_manager_email_list = [];
            const email_list = await getAllPropertyManagerEmail();
            console.log(email_list)
            for (let email of email_list) {
                property_manager_email_list.push(email.email)
            }
            console.log(property_manager_email_list)
            const survey = await getSurveyById(req.body.survey_id)
            await transporter.sendMail({
                from: `HIMA<${process.env.MAILER_EMAIL}>`, 
                to: `${property_manager_email_list}`, 
                subject: "New survey has been published",
                text: `Hi,\n\n New survey ${survey.survey_title} has been published. Please check the detail of new survey from Hima application.\n\n Best Regards,\nHSY admin`, 
            });
        }
        res.json({message: `survey ${req.body.survey_id} has been successfully published!`, status: 200 });
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
        const assigned_survey_info = await getAssignedSurveyInfoByKey("unused",req.params.key);

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

const assigned_survey_delete = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error('assigned_survey_delete validation', errors.array());
            const err = httpError(errors.errors[0].msg, 400);
            next(err);
            return;
        }
        const survey = await getAssignedSurveyById(req.body.as_id);
        if (!survey) {
            const err = httpError(`Survey not found by id ${req.body.as_id}`, 404);
            next(err);
            return;
        } else {
            await deleteAssignedSurveyById(req.body.as_id);
            res.json({ message: `Assigned survey deleted: ${req.body.as_id}`, status: 200 });
        }
    } catch (error) {
        next(error);
    };
};

const assigned_survey_key_list_get = async (req, res, next) => {
    try {
        const keys = await getAllKeyByAssignedSurveyId(req.params.as_id, req.params.key_status);
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
            const saved_answers = await getAllAssignedSurveyAnswersByKey(req.params.key);
            if (saved_answers.length == req.body.answers.length) {
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

const survey_answer_get_by_key = async (req, res, next) => { 
    try {
        const own_key_status = await checkKeyStatus(req.params.key)
        if (own_key_status.key_status == "used") { 
            const assigned_survey_info = await getAssignedSurveyInfoByKey("used", req.params.key);
            const survey = await getSurveyById(assigned_survey_info.s_id);
            const saved_answers = await getAllAssignedSurveyAnswersByKey(req.params.key);
            const key_status = "used"
            const survey_point_list = [];
            const assgned_survey_id = await getAssigndSurveyIdByKey(req.params.key)
            const answered_survey_keys = await getAllKeyByAssignedSurveyId(assgned_survey_id.as_id, key_status);
            let number_of_questions = 0
            let survey_points = 0
            for (let savedAnswer of saved_answers) {
                const survey_question = await getSurveyQuestionByQuestionId(savedAnswer.q_id);
                if (survey_question.option_1 == savedAnswer.selected_option) {
                    survey_points += 1
                } else if (survey_question.option_2 == savedAnswer.selected_option){
                    survey_points += 0.5
                }
            }

            for (let answered_survey_key of answered_survey_keys) {
                const saved_answers = await getAllAssignedSurveyAnswersByKey(answered_survey_key.survey_key);
                let survey_points = 0
                number_of_questions = saved_answers.length
                for (let savedAnswer of saved_answers) {
                    const survey_question = await getSurveyQuestionByQuestionId(savedAnswer.q_id);
                    if (survey_question.option_1 == savedAnswer.selected_option) {
                        survey_points += 1
                    } else if (survey_question.option_2 == savedAnswer.selected_option) {
                        survey_points += 0.5
                    }
                }
                survey_point_list.push(survey_points)
            }

            const total_point = survey_point_list.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            const rounded_average_point = Number((total_point / survey_point_list.length).toFixed(2));
            const average_percentage = (total_point / (number_of_questions * survey_point_list.length)) * 100;
            const formatted_average_percentage = Number(average_percentage.toFixed(1));
            const own_percentage = (survey_points / saved_answers.length) * 100;
            const formatted_own_percentage = Number(own_percentage.toFixed(1));

            res.json({ survey_head: survey, survey_answers: saved_answers, average_percentage: formatted_average_percentage, average_survey_point: rounded_average_point, own_percentage: formatted_own_percentage, own_survey_points: survey_points, answer_count: answered_survey_keys.length});
        } else {
            throw httpError("Fail to check survey anwser, because this has not yet been submited.", 400);
        }
    } catch (error) {
        next(error);
    };
}

const assigned_survey_answer_list_get = async (req, res, next) => {
    try {
        const key_status = "used"
        const survey_answer_list = [];
        const survey_statistics_list = [];
        const survey_point_list = [];
        const merged_statics = [];
        const answered_survey_keys = await getAllKeyByAssignedSurveyId(req.params.as_id, key_status);
        const number_of_answers = answered_survey_keys.length
        let number_of_questions = 0

        for (let answered_survey_key of answered_survey_keys) {
            const assigned_survey_info = await getAssignedSurveyInfoByKey(key_status, answered_survey_key.survey_key);
            const survey = await getSurveyById(assigned_survey_info.s_id);
            const saved_answers = await getAllAssignedSurveyAnswersByKey(answered_survey_key.survey_key);
            let survey_points = 0
            let percentage = 0
            number_of_questions = saved_answers.length

            for (let savedAnswer of saved_answers) {
                let number_option_1 = 0
                let number_option_2 = 0
                let number_option_3 = 0
                const survey_question = await getSurveyQuestionByQuestionId(savedAnswer.q_id);
                if (survey_question.option_1 == savedAnswer.selected_option) {
                    survey_points += 1
                    number_option_1 += 1
                } else if (survey_question.option_2 == savedAnswer.selected_option) {
                    survey_points += 0.5
                    number_option_2 += 1
                } else {
                    number_option_3 += 1
                }
                const survey_question_statistics= {
                question: savedAnswer.question,
                number_resident_selected_option_1: number_option_1,
                number_resident_selected_option_2: number_option_2,
                number_resident_selected_option_3: number_option_3
                }
                survey_statistics_list.push(survey_question_statistics) 
            }
            percentage = (survey_points / number_of_questions) * 100;
            const formatted_percentage = percentage.toFixed(1) + "%";

            const survey_answer = {
                survey_head: survey,
                survey_answers: saved_answers,
                survey_points: survey_points,
                percentage: formatted_percentage
            }
            survey_answer_list.push(survey_answer)
            survey_point_list.push(survey_points)
        }

        const total_point = survey_point_list.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const rounded_average_point = Number((total_point / survey_point_list.length).toFixed(2));
        const average_percentage = (total_point / (number_of_questions * survey_point_list.length)) * 100;
        const formatted_average_percentage = Number(average_percentage.toFixed(1));

        survey_statistics_list.forEach((survey_statistics) => {
            const existing_survey_statistics = merged_statics.find((mergedItem) => mergedItem.question === survey_statistics.question);
            if (existing_survey_statistics) {
                existing_survey_statistics.number_resident_selected_option_1 += survey_statistics.number_resident_selected_option_1;
                existing_survey_statistics.number_resident_selected_option_2 += survey_statistics.number_resident_selected_option_2;
                existing_survey_statistics.number_resident_selected_option_3 += survey_statistics.number_resident_selected_option_3;
            } else {
                merged_statics.push(survey_statistics);
            }
        });

        res.json({number_of_answers: number_of_answers, survey_point_list: survey_point_list, average_percentage: formatted_average_percentage, average_survey_point: rounded_average_point, survey_questions_statistics: merged_statics, survey_answers: survey_answer_list});
    } catch(error) {
        next(error);
    };
};

const survey_answer_list_get = async (req, res, next) => {
    try {
        const key_status = "used"
        const assigned_survey_id_list = await getAllAssignedSurveyIdBySurveyId(req.params.s_id);
        const assigned_survey_key_list = []
        for (let assigned_survey_id of assigned_survey_id_list) { 
            const answered_survey_keys = await getAllKeyByAssignedSurveyId(assigned_survey_id.assigned_survey_id, key_status);
            for (let answerd_survey_key of answered_survey_keys) {
                assigned_survey_key_list.push(answerd_survey_key)
            }
        }
        const survey_answer_list = [];
        const survey_statistics_list = [];
        const survey_point_list = [];
        const merged_statics = [];
        const number_of_answers = assigned_survey_key_list.length
        let number_of_questions = 0


        for (let answered_survey_key of assigned_survey_key_list) {
            const assigned_survey_info = await getAssignedSurveyInfoByKey(key_status, answered_survey_key.survey_key);
            const survey = await getSurveyById(assigned_survey_info.s_id);
            const saved_answers = await getAllAssignedSurveyAnswersByKey(answered_survey_key.survey_key);
            const assign_survey_info = await getAssignedSurveyInfoBySurveyKey(answered_survey_key.survey_key);
            let survey_points = 0
            let percentage = 0
            number_of_questions = saved_answers.length

            for (let savedAnswer of saved_answers) {
                let number_option_1 = 0
                let number_option_2 = 0
                let number_option_3 = 0
                const survey_question = await getSurveyQuestionByQuestionId(savedAnswer.q_id);
                if (survey_question.option_1 == savedAnswer.selected_option) {
                    survey_points += 1
                    number_option_1 += 1
                } else if (survey_question.option_2 == savedAnswer.selected_option) {
                    survey_points += 0.5
                    number_option_2 += 1
                } else {
                    number_option_3 += 1
                }
                const survey_question_statistics = {
                    question: savedAnswer.question,
                    number_resident_selected_option_1: number_option_1,
                    number_resident_selected_option_2: number_option_2,
                    number_resident_selected_option_3: number_option_3
                }
                survey_statistics_list.push(survey_question_statistics)
            }
            percentage = (survey_points / number_of_questions) * 100;
            const formatted_percentage = Number(percentage.toFixed(2));
            const combinedSurveyInfo = Object.assign({}, survey, assign_survey_info);
            const survey_answer = {
                survey_head: combinedSurveyInfo,
                survey_answers: saved_answers,
                survey_points: survey_points,
                percentage: formatted_percentage
            }
            survey_answer_list.push(survey_answer)
            survey_point_list.push(survey_points)
        }

        const total_point = survey_point_list.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const rounded_average_point = Number((total_point / survey_point_list.length).toFixed(2));
        const average_percentage = (total_point / (number_of_questions * survey_point_list.length)) * 100;
        const formatted_average_percentage = Number(average_percentage.toFixed(1));

        survey_statistics_list.forEach((survey_statistics) => {
            const existing_survey_statistics = merged_statics.find((mergedItem) => mergedItem.question === survey_statistics.question);
            if (existing_survey_statistics) {
                existing_survey_statistics.number_resident_selected_option_1 += survey_statistics.number_resident_selected_option_1;
                existing_survey_statistics.number_resident_selected_option_2 += survey_statistics.number_resident_selected_option_2;
                existing_survey_statistics.number_resident_selected_option_3 += survey_statistics.number_resident_selected_option_3;
            } else {
                merged_statics.push(survey_statistics);
            }
        });

        res.json({ number_of_answers: number_of_answers, survey_point_list: survey_point_list, average_percentage: formatted_average_percentage, average_survey_point: rounded_average_point, survey_questions_statistics: merged_statics, survey_answers: survey_answer_list });
    } catch (error) {
        next(error);
    };
};

const survey_end_time_update = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error('survey_end_time_update validation', errors.array());
            const err = httpError(errors.errors[0].msg, 400);
            next(err);
            return;
        }
        const survey = await getSurveyById(req.body.s_id);
        if (survey) {
            await updateSurveyEndDate(req.body.end_time, req.body.s_id);
            res.json({ message: `Survey ${survey.survey_title}'s end time has updated from ${req.body.end_time} to ${survey.end_time}` });
        } else {
            throw new Error("Survey not found");
        }
    } catch (error) {
        next(error);
    };
};

  
module.exports = {
    survey_list_get,
    survey_post,
    survey_publish_post,
    survey_delete,
    survey_get_by_id,
    assign_survey_post,
    assigned_survey_list_get,
    assigned_survey_key_list_get,
    assigned_survey_key_post,
    survey_get_by_key,
    survey_question_answer_post,
    survey_answer_get_by_key,
    assigned_survey_delete,
    assigned_survey_answer_list_get,
    survey_answer_list_get,
    survey_end_time_update
};