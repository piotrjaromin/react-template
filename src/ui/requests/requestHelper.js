'use strict';

const logger = require('./../logger');
const loginUtils = require('../login/utils');
const axios = require('axios');

module.exports.request = function (method, url, formData, successCallback, errorHandler) {
    axios({
        url,
        method,
        contentType: 'application/json',
        headers: {
            Authorization: `Bearer  ${loginUtils.getToken()}`
        },
        data: formData
    })
    .then(({data}) => successCallback(data))
    .catch(({response: {status, data}}) => {

        logger.debug(`error response from server ${status}`);
        if (status !== 400) {
            logger.info(`Fails  status: ${status} data: ${data}`);
        }

        errorHandler(status, data);
    });
};


module.exports.postFormRequest = function (url, formData, successCallback, errorHandler) {
    module.exports.request('POST', url, formData, successCallback, errorHandler)
};

module.exports.getRequest = function (url, successCallback, errorHandler) {

    return axios({
        url,
        method: 'GET',
        contentType: 'application/json',
        headers: {
            Authorization: `Bearer  ${loginUtils.getToken()}`
        }
    })
    .then(({data}) => successCallback(data))
    .catch(({response: {status, data}}) => {
        logger.info(` Fails  ${data} status: ${status}`);
        errorHandler(data);
    });

};
