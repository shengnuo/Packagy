'use strict';

const policy = require('../../service/policy.service');
const packageController = require('../../controller/package.controller');

module.exports = (app, passport) => {
    //TODO enable session check
    app.route('/api/package/create').all(policy.auth).post(packageController.create);
    app.route('/api/package/delete').all(policy.auth).delete(packageController.delete);
    app.route('/api/package/resolve').all(policy.auth).put(packageController.resolve);
    app.route('/api/package/my_packages').all(policy.auth).get(packageController.getPackages);
};