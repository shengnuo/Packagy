'use strict';

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const swig = require('swig');

var server = express();
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', __dirname + '/build/');
server.use('/', express.static(__dirname + '/build/'));

//injecting middleware
server.use(session({
    secret: 'secret',
    resave: false
}));
server.use(express.static('server'));
server.use(passport.initialize());
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());
server.use(passport.session());

//db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://PackagyDev:Packagy@ds115085.mlab.com:15085/packagy');

//db schemas
require('./server/repository/package.model.js');
require('./server/repository/user.group.model.js');
require('./server/repository/user.model.js');

//src routing
require('./server/routing')(server, passport);

server.listen(8081);