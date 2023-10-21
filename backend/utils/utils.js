'use strict';

const generateSixDigitNumber = () => {
    return Math.floor(100000 + Math.random() * 900000); 
};

const getCurrentDate = () => {
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();
    let currentDate = day + '-' + month + '-' + year;
    return currentDate; 
};

const parseDate = (str) => {
    var parts = str.split("-");
    return new Date(parts[2], parts[1] - 1, parts[0]);
};

const isCurrentDateInSurveyDataRange = (date, startDate, endDate) => {
    var date = parseDate(date);
    var startDate = parseDate(startDate);
    var endDate = parseDate(endDate);
    return date >= startDate && date <= endDate;
};

const isCurrentDateBeforeSurveyEndDate = (date, endDate) => {
    var date = parseDate(date);
    var endDate = parseDate(endDate);
    return date <= endDate;
};

module.exports = {
    generateSixDigitNumber,
    isCurrentDateInSurveyDataRange,
    getCurrentDate,
    isCurrentDateInSurveyDataRange,
    isCurrentDateBeforeSurveyEndDate
}; 