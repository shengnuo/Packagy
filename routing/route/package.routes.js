'use strict';

const policy = require('../../service/policy.service');
const packageController = require('../../controller/package.controller');

module.exports = (app, passport) => {
    app.route('/api/package/create')./*all(policy.auth).*/post(packageController.create);
};