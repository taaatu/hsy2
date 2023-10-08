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


module.exports = {
    insertSurvey,
    getAllSurvey,
    deleteSurveyById,
    getSurveyById,
    getSurveyQuestionsBySurveyId,
    insertSurveyQuestionBySurveyId
}; 