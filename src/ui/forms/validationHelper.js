'use strict';


module.exports.errorForFields = function (detailsArr = []) {
    const messages = {};
    detailsArr.forEach(fieldErr => messages[fieldErr.field] = fieldErr.message);
    return messages;
};