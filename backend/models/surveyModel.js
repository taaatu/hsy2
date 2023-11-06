'use strict';
const pool = require("../database/db");
const { httpError } = require("../utils/errors");
const promisePool = pool.promise();

const getAllSurvey = async (user) => {
    try {
        if (user.user_group == 0) {
            const [rows] = await promisePool.query(
                "SELECT * FROM survey"
            );
            return rows;
        } else { 
            const [rows] = await promisePool.query(
                "SELECT * FROM survey WHERE survey_status = 'published'"
            );
            return rows;
        }

    } catch (e) {
        console.error('model get all survey', e.message);
        throw httpError(e.message, 400);
    }
};

const insertSurvey = async (survey) => {
    try {
        const [rows] = await promisePool.execute(
            "INSERT INTO survey (u_id, survey_title, start_time, end_time, description, survey_status) VALUES (?,?,?,?,?,?)",
            [survey.u_id, survey.survey_title, survey.start_time, survey.end_time, survey.description, survey.survey_status]
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

const getSurveyQuestionByQuestionId = async (questionId) => {
    try {
        const [rows] = await promisePool.execute(
            "SELECT * FROM survey_question WHERE question_id = ?",
            [questionId]
        );
        console.log("Get survey question by question id?", rows);
        return rows[0];
    } catch (e) {
        console.error("model get survey question by question id", e.message);
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

const createKeyForAssignedSurvey = async (key,as_id) => {
    try {
        const [rows] = await promisePool.execute(
            "INSERT INTO assigned_survey_key (survey_key, as_id, key_status) VALUES (?,?,?)",
            [key, as_id, "unused"]
        );
        console.log("model insert key for assigned survey", rows);
        return rows.insertId;
    } catch (e) {
        console.error("model insert key for assigned survey", e.message);
        throw httpError(e.message, 400);
    }
}; 

const getAllKeyByAssignedSurveyId = async (assgnedSurveyId,keyStatus) => {
    try {
        if (keyStatus == "all") {
            const [rows] = await promisePool.query(
            "SELECT survey_key, key_status FROM assigned_survey_key WHERE as_id =?",
            [assgnedSurveyId]
            );
            return rows;
        } else {   
            const [rows] = await promisePool.query(
            "SELECT survey_key, key_status FROM assigned_survey_key WHERE as_id =? AND key_status = ?",
            [assgnedSurveyId, keyStatus]
            );
            return rows;
        }
    } catch (e) {
        console.error('model get all assigned survey key', e.message);
        throw httpError(e.message, 400);
    }
};

const getAssignedSurveyInfoByKey = async (keyStatus,surveyKey) => {
    try {
        const [rows] = await promisePool.execute(
            "SELECT * FROM assigned_survey JOIN assigned_survey_key ON assigned_survey.assigned_survey_id = assigned_survey_key.as_id WHERE assigned_survey_key.key_status = ? AND assigned_survey_key.survey_key = ? ",
            [keyStatus,surveyKey]
        );
        console.log("Get by survey key result?", rows);
        return rows[0];
    } catch (e) {
        console.error("model get assigned survey info by key", e.message);
        throw httpError(e.message, 400);
    }
};

const getSurveyInfoByAssignedSurveyId = async (assignedSurveyId) => {
    try {
        const [rows] = await promisePool.execute(
            "SELECT * FROM survey JOIN assigned_survey ON survey.survey_id = assigned_survey.s_id WHERE assigned_survey.assigned_survey_id = ? ",
            [assignedSurveyId]
        );
        console.log("Get survey info by assigned survey ID result?", rows);
        return rows[0];
    } catch (e) {
        console.error("model survey info by assigned survey ID", e.message);
        throw httpError(e.message, 400);
    }
};

const insertSurveyQuestionAnswer = async (answer,key) => {
    try {
        const [rows] = await promisePool.execute(
            "INSERT INTO question_answer (q_id, selected_option, s_key) VALUES (?,?,?)",
            [answer.q_id, answer.selected_option,key]
        );
        console.log("model insert survey question answer", rows);
        return rows.insertId;
    } catch (e) {
        console.error("model insert survey question answer", e.message);
        throw httpError(e.message, 400);
    }
}; 

const updateKeyStatus = async (key) => {
    try {
        const [rows] = await promisePool.execute(
            "UPDATE assigned_survey_key SET key_status = 'used' WHERE survey_key = ? ",
            [key]
        );
        return rows.affectedRows === 1;
    } catch (e) {
        console.error("model update assigned survey key status", e.message);
        throw httpError(e.message, 400);
    }
}; 

const checkKeyStatus = async (key) => {
    try {
        const [rows] = await promisePool.execute(
            "SELECT key_status FROM assigned_survey_key WHERE survey_key = ?",
            [key]
        );
        return rows[0];
    } catch (e) {
        console.error("model get key status by key", e.message);
        throw httpError(e.message, 400);
    }
};

const getAllAssignedSurveyAnswersByKey = async (surveyKey) => {
    try {
        const [rows] = await promisePool.query(
            "SELECT  q_id, question, selected_option\
            FROM ( SELECT * FROM question_answer WHERE s_key = ? ) AS qa \
            JOIN survey_question ON qa.q_id = survey_question.question_id;",
            [surveyKey]
        );
        return rows;
    } catch (e) {
        console.error('model get all answers of assigned survey by survey key', e.message);
        throw httpError(e.message, 400);
    }
};

const updateSurveyStatus = async (surveyId) => {
    try {
        const [rows] = await promisePool.execute(
            "UPDATE survey SET survey_status = 'published' WHERE survey_id = ?",
            [surveyId]
        );
        return rows.affectedRows === 1;
    } catch (e) {
        console.error("model update survey status", e.message);
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
    getAllAssignedSurveyByUserId,
    createKeyForAssignedSurvey,
    getAllKeyByAssignedSurveyId,
    getAssignedSurveyInfoByKey,
    getSurveyInfoByAssignedSurveyId,
    insertSurveyQuestionAnswer,
    updateKeyStatus,
    checkKeyStatus,
    getAllAssignedSurveyAnswersByKey,
    getSurveyQuestionByQuestionId,
    updateSurveyStatus
}; 