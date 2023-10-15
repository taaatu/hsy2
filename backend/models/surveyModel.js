'use strict';
const pool = require("../database/db");
const { httpError } = require("../utils/errors");
const promisePool = pool.promise();

const getAllSurvey = async () => {
    try {
        const [rows] = await promisePool.query(
            "SELECT * FROM survey"
        );
        return rows;
    } catch (e) {
        console.error('model get all survey', e.message);
        throw httpError(e.message, 400);
    }
};

const insertSurvey = async (survey) => {
    try {
        const [rows] = await promisePool.execute(
            "INSERT INTO survey (u_id, survey_title, start_time, end_time, description) VALUES (?,?,?,?,?)",
            [survey.u_id, survey.survey_title, survey.start_time, survey.end_time, survey.description]
        );
        console.log("model insert survey", rows);
        return rows.insertId;
    } catch (e) {
        console.error("model insert survey", e.message);
        throw httpError(e.message, 400);
    }
}; 

const deleteSurveyById = async (surveyId) => {
    try {
        const [rows] = await promisePool.execute(
            "DELETE FROM survey WHERE survey_id = ?",
            [surveyId]
        );
        console.log("model delete survey", rows);
        return true;
    } catch (e) {
        console.error("model delete survey", e.message);
        throw httpError(e.message, 400);
    }
};

const getSurveyById = async (surveyId) => {
    try {
        const [rows] = await promisePool.execute(
            "SELECT * FROM survey WHERE survey_id = ?",
            [surveyId]
        );
        console.log("Get by survey id result?", rows);
        return rows[0];
    } catch (e) {
        console.error("model get survey by id", e.message);
        throw httpError(e.message, 400);
    }
};

const getSurveyQuestionsBySurveyId = async (surveyId) => {
    try {
        const [rows] = await promisePool.execute(
            "SELECT * FROM survey_question WHERE s_id = ?",
            [surveyId]
        );
        console.log("Get survey questions by survey id?", rows);
        return rows;
    } catch (e) {
        console.error("model get survey questions by survey id", e.message);
        throw httpError(e.message, 400);
    }
};

const insertSurveyQuestionBySurveyId = async (surveyId,question) => {
    try {
        const [rows] = await promisePool.execute(
            "INSERT INTO survey_question (s_id, question, option_1, option_2, option_3) VALUES (?,?,?,?,?)",
            [surveyId, question.question, question.option_1, question.option_2, question.option_3]
        );
        console.log("model insert survey question", rows);
        return rows.insertId;
    } catch (e) {
        console.error("model insert survey question", e.message);
        throw httpError(e.message, 400);
    }
}; 

const assignSurveyToBuilding = async (assignSurvey) => {
    try {
        const [rows] = await promisePool.execute(
            "INSERT INTO assigned_survey (s_id, b_id) VALUES (?,?)",
            [assignSurvey.s_id, assignSurvey.b_id]
        );
        console.log("model assign survey", rows);
        return rows.insertId;
    } catch (e) {
        console.error("model assign survey", e.message);
        throw httpError(e.message, 400);
    }
}; 

const getAllAssignedSurveyByUserId = async (user) => {
    try {
        if (user.user_group == 0) {
            const [rows] = await promisePool.query(
                "SELECT assigned_survey_id,survey_id, survey_creator_id, survey_title, \
                start_time, end_time, description, u_id as assigned_perperty_manager_u_id, street, \
                post_code, city, name as building_name FROM(SELECT assigned_survey_id, survey.survey_id, \
                survey.u_id as survey_creator_id, survey_title, start_time, end_time, \
                description, b_id FROM survey JOIN assigned_survey ON \
                assigned_survey.s_id = survey.survey_id) AS new JOIN building ON \
                new.b_id = building.building_id"
            );
            return rows;
        } else {
            const [rows] = await promisePool.query(
                "SELECT assigned_survey_id,survey_id, survey_creator_id, survey_title, \
                start_time, end_time, description, u_id as assigned_perperty_manager_u_id, street, \
                post_code, city, name as building_name FROM(SELECT assigned_survey_id, survey.survey_id, \
                survey.u_id as survey_creator_id, survey_title, start_time, end_time, \
                description, b_id FROM survey JOIN assigned_survey ON \
                assigned_survey.s_id = survey.survey_id) AS new JOIN building ON \
                new.b_id = building.building_id WHERE building.u_id = ? ",
                [user.user_id]
            );
            return rows;
        }
    } catch (e) {
        console.error('model get all assigned survey list', e.message);
        throw httpError(e.message, 400);
    }
};

module.exports = {
    insertSurvey,
    getAllSurvey,
    deleteSurveyById,
    getSurveyById,
    getSurveyQuestionsBySurveyId,
    insertSurveyQuestionBySurveyId,
    assignSurveyToBuilding,
    getAllAssignedSurveyByUserId
}; 