'use strict';

module.exports.isLoggedIn = function () {
    let token = localStorage.getItem('token');
    return token && token.length > 0
};

module.exports.getLoggedEmail = function () {
    return localStorage.getItem('email')
};

module.exports.getToken = function () {
    return localStorage.getItem('token')
};

module.exports.saveTokenAndEmail = function (token, email) {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
};