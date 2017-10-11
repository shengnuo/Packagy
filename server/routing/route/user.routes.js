'use strict';

const policy = require('../../service/policy.service');
const userController = require('../../controller/user.controller');

module.exports = (app, passport) => {
    app.route('/api/user/signup').post(userController.signup);
    app.route('/api/user/login').post(userController.login);
    app.route('/api/user/logout').all(policy.auth).post(userController.logout);
    app.route('/api/user/get_all_groups').get(userController.getAllUserGroups);
};