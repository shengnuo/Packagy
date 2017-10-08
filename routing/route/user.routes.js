'use strict';
//TODO add controllers
const userController = require('../../controller/user.controller');

module.exports = (app, password) => {
    app.route('/api/user/signup').post(userController.signup);
    app.route('/api/user/login').post(userController.login);
};