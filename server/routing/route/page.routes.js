'use strict';

const path = require('path');
const policy = require('../../service/policy.service');

module.exports = (server) => {
    const appDir = path.dirname(require.main.filename);

    server.get('/', (req, res) => {
        console.log('request: /');
        res.render(appDir + '/client/index');
    });

    server.get('/dash', policy.auth, (req, res) => {
       console.log('request: /');
       res.render(appDir + '/client/dash');
    });
};